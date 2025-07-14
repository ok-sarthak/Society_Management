import { ReportTemplate, ReportInstance } from '../../models/Report.js';

// Report Template Controllers
export const getReportTemplates = async (req, res) => {
  try {
    const { category, dataSource, isActive, search } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (dataSource) filter.dataSource = dataSource;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const templates = await ReportTemplate.find(filter)
      .populate('createdBy', 'name email')
      .sort({ name: 1 });

    res.json({ templates });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report templates', error: error.message });
  }
};

export const createReportTemplate = async (req, res) => {
  try {
    const templateData = {
      ...req.body,
      createdBy: req.user.id
    };

    const template = new ReportTemplate(templateData);
    await template.save();

    res.status(201).json({ message: 'Report template created successfully', template });
  } catch (error) {
    res.status(400).json({ message: 'Error creating report template', error: error.message });
  }
};

export const updateReportTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await ReportTemplate.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!template) {
      return res.status(404).json({ message: 'Report template not found' });
    }

    res.json({ message: 'Report template updated successfully', template });
  } catch (error) {
    res.status(400).json({ message: 'Error updating report template', error: error.message });
  }
};

export const deleteReportTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if template has generated reports
    const reportCount = await ReportInstance.countDocuments({ template: id });
    if (reportCount > 0) {
      return res.status(400).json({ 
        message: `Cannot delete template with ${reportCount} generated reports` 
      });
    }

    const template = await ReportTemplate.findByIdAndDelete(id);

    if (!template) {
      return res.status(404).json({ message: 'Report template not found' });
    }

    res.json({ message: 'Report template deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting report template', error: error.message });
  }
};

// Report Instance Controllers
export const getReports = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      template, 
      status, 
      generatedBy,
      startDate,
      endDate,
      search 
    } = req.query;
    
    const filter = {};
    if (template) filter.template = template;
    if (status) filter.status = status;
    if (generatedBy) filter.generatedBy = generatedBy;
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }
    
    if (search) {
      filter.$or = [
        { reportId: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const reports = await ReportInstance.find(filter)
      .populate('template', 'name category type')
      .populate('generatedBy', 'name email')
      .populate('sharedWith.user', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ReportInstance.countDocuments(filter);

    res.json({
      reports,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};

export const generateReport = async (req, res) => {
  try {
    const { templateId } = req.params;
    const { parameters, title, description } = req.body;

    const template = await ReportTemplate.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: 'Report template not found' });
    }

    // Create report instance
    const report = new ReportInstance({
      template: templateId,
      title: title || template.name,
      description,
      parameters,
      generatedBy: req.user.id,
      status: 'generating',
      executionTime: {
        startedAt: new Date()
      }
    });

    await report.save();

    // In a real implementation, this would trigger background processing
    // For now, we'll simulate report generation
    setTimeout(async () => {
      try {
        // Simulate data processing
        const mockData = {
          raw: { records: [] },
          processed: { summary: 'Mock processed data' },
          summary: {
            totalRecords: 100,
            totalValue: 50000,
            averageValue: 500,
            maxValue: 1000,
            minValue: 100
          }
        };

        await ReportInstance.findByIdAndUpdate(report._id, {
          status: 'completed',
          data: mockData,
          'executionTime.completedAt': new Date(),
          'executionTime.duration': 5000, // 5 seconds
          fileUrl: `/reports/${report.reportId}.pdf`,
          fileSize: 1024000 // 1MB
        });
      } catch (error) {
        await ReportInstance.findByIdAndUpdate(report._id, {
          status: 'failed'
        });
      }
    }, 2000);

    res.status(201).json({ message: 'Report generation started', report });
  } catch (error) {
    res.status(400).json({ message: 'Error generating report', error: error.message });
  }
};

export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await ReportInstance.findById(id)
      .populate('template', 'name category type fields')
      .populate('generatedBy', 'name email')
      .populate('sharedWith.user', 'name email');

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ report });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report', error: error.message });
  }
};

export const shareReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { users, permission = 'view' } = req.body;

    const report = await ReportInstance.findById(id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Add users to shared list
    for (const userId of users) {
      const existingShare = report.sharedWith.find(s => s.user.toString() === userId);
      if (!existingShare) {
        report.sharedWith.push({
          user: userId,
          permission
        });
      }
    }

    await report.save();

    res.json({ message: 'Report shared successfully', report });
  } catch (error) {
    res.status(400).json({ message: 'Error sharing report', error: error.message });
  }
};

export const downloadReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await ReportInstance.findById(id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    if (report.status !== 'completed') {
      return res.status(400).json({ message: 'Report is not ready for download' });
    }

    // Update download count
    report.downloadCount += 1;
    report.lastDownloadedAt = new Date();
    await report.save();

    // In a real implementation, this would serve the actual file
    res.json({ 
      message: 'Report download initiated',
      downloadUrl: report.fileUrl,
      fileSize: report.fileSize
    });
  } catch (error) {
    res.status(500).json({ message: 'Error downloading report', error: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await ReportInstance.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting report', error: error.message });
  }
};

export const getReportsDashboard = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total reports count
    const totalReports = await ReportInstance.countDocuments();

    // Reports by status
    const statusStats = await ReportInstance.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Reports by category (from template)
    const categoryStats = await ReportInstance.aggregate([
      {
        $lookup: {
          from: 'reporttemplates',
          localField: 'template',
          foreignField: '_id',
          as: 'templateInfo'
        }
      },
      {
        $group: {
          _id: '$templateInfo.category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Most used templates
    const popularTemplates = await ReportInstance.aggregate([
      {
        $group: {
          _id: '$template',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'reporttemplates',
          localField: '_id',
          foreignField: '_id',
          as: 'templateInfo'
        }
      }
    ]);

    // Recent reports
    const recentReports = await ReportInstance.find()
      .populate('template', 'name category')
      .populate('generatedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    // This month's generation stats
    const monthlyStats = await ReportInstance.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      {
        $group: {
          _id: { $dayOfMonth: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json({
      totalReports,
      statusStats,
      categoryStats,
      popularTemplates,
      recentReports,
      monthlyStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports dashboard', error: error.message });
  }
};
