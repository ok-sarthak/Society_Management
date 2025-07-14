import { SystemConfig, ThemeConfig, EmailTemplate, BackupConfig } from '../../models/AdminSettings.js';

// System Configuration Controllers
export const getSystemConfigs = async (req, res) => {
  try {
    const { category, key, isVisible } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (key) filter.key = key;
    if (isVisible !== undefined) filter.isVisible = isVisible === 'true';

    const configs = await SystemConfig.find(filter)
      .populate('lastModified.by', 'name email')
      .populate('history.changedBy', 'name email')
      .sort({ category: 1, key: 1 });

    res.json({ configs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching system configurations', error: error.message });
  }
};

export const updateSystemConfig = async (req, res) => {
  try {
    const { id } = req.params;
    const { value, reason } = req.body;

    const config = await SystemConfig.findById(id);
    if (!config) {
      return res.status(404).json({ message: 'System configuration not found' });
    }

    if (!config.isEditable) {
      return res.status(400).json({ message: 'This configuration is not editable' });
    }

    // Validate based on data type and validation rules
    if (config.validation) {
      if (config.validation.required && !value) {
        return res.status(400).json({ message: 'Value is required' });
      }
      
      if (config.validation.allowedValues && !config.validation.allowedValues.includes(value)) {
        return res.status(400).json({ message: 'Invalid value' });
      }
      
      if (config.dataType === 'number') {
        const numValue = Number(value);
        if (config.validation.minValue && numValue < config.validation.minValue) {
          return res.status(400).json({ message: `Value must be at least ${config.validation.minValue}` });
        }
        if (config.validation.maxValue && numValue > config.validation.maxValue) {
          return res.status(400).json({ message: `Value cannot exceed ${config.validation.maxValue}` });
        }
      }
    }

    config.value = value;
    config.lastModified = {
      date: new Date(),
      by: req.user.id
    };

    if (reason) {
      config.history.push({
        value,
        changedBy: req.user.id,
        reason
      });
    }

    await config.save();

    res.json({ message: 'System configuration updated successfully', config });
  } catch (error) {
    res.status(400).json({ message: 'Error updating system configuration', error: error.message });
  }
};

export const createSystemConfig = async (req, res) => {
  try {
    const configData = {
      ...req.body,
      lastModified: {
        date: new Date(),
        by: req.user.id
      }
    };

    const config = new SystemConfig(configData);
    await config.save();

    res.status(201).json({ message: 'System configuration created successfully', config });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Configuration with this category and key already exists' });
    }
    res.status(400).json({ message: 'Error creating system configuration', error: error.message });
  }
};

// Theme Configuration Controllers
export const getThemeConfigs = async (req, res) => {
  try {
    const { isActive, isDefault } = req.query;
    
    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (isDefault !== undefined) filter.isDefault = isDefault === 'true';

    const themes = await ThemeConfig.find(filter)
      .populate('createdBy', 'name email')
      .sort({ isDefault: -1, name: 1 });

    res.json({ themes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching theme configurations', error: error.message });
  }
};

export const createThemeConfig = async (req, res) => {
  try {
    const themeData = {
      ...req.body,
      createdBy: req.user.id
    };

    // If this theme is set as default, remove default from others
    if (themeData.isDefault) {
      await ThemeConfig.updateMany({}, { isDefault: false });
    }

    const theme = new ThemeConfig(themeData);
    await theme.save();

    res.status(201).json({ message: 'Theme configuration created successfully', theme });
  } catch (error) {
    res.status(400).json({ message: 'Error creating theme configuration', error: error.message });
  }
};

export const updateThemeConfig = async (req, res) => {
  try {
    const { id } = req.params;
    
    // If setting as default, remove default from others
    if (req.body.isDefault) {
      await ThemeConfig.updateMany({ _id: { $ne: id } }, { isDefault: false });
    }

    const theme = await ThemeConfig.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!theme) {
      return res.status(404).json({ message: 'Theme configuration not found' });
    }

    res.json({ message: 'Theme configuration updated successfully', theme });
  } catch (error) {
    res.status(400).json({ message: 'Error updating theme configuration', error: error.message });
  }
};

export const setDefaultTheme = async (req, res) => {
  try {
    const { id } = req.params;

    // Remove default from all themes
    await ThemeConfig.updateMany({}, { isDefault: false });

    // Set the selected theme as default
    const theme = await ThemeConfig.findByIdAndUpdate(
      id,
      { isDefault: true },
      { new: true }
    );

    if (!theme) {
      return res.status(404).json({ message: 'Theme configuration not found' });
    }

    res.json({ message: 'Default theme updated successfully', theme });
  } catch (error) {
    res.status(400).json({ message: 'Error setting default theme', error: error.message });
  }
};

// Email Template Controllers
export const getEmailTemplates = async (req, res) => {
  try {
    const { category, isActive, isDefault, search } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (isDefault !== undefined) filter.isDefault = isDefault === 'true';
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const templates = await EmailTemplate.find(filter)
      .populate('createdBy', 'name email')
      .sort({ category: 1, name: 1 });

    res.json({ templates });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching email templates', error: error.message });
  }
};

export const createEmailTemplate = async (req, res) => {
  try {
    const templateData = {
      ...req.body,
      createdBy: req.user.id
    };

    // If this template is set as default for category, remove default from others in same category
    if (templateData.isDefault) {
      await EmailTemplate.updateMany(
        { category: templateData.category },
        { isDefault: false }
      );
    }

    const template = new EmailTemplate(templateData);
    await template.save();

    res.status(201).json({ message: 'Email template created successfully', template });
  } catch (error) {
    res.status(400).json({ message: 'Error creating email template', error: error.message });
  }
};

export const updateEmailTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    
    const template = await EmailTemplate.findById(id);
    if (!template) {
      return res.status(404).json({ message: 'Email template not found' });
    }

    // If setting as default, remove default from others in same category
    if (req.body.isDefault) {
      await EmailTemplate.updateMany(
        { category: template.category, _id: { $ne: id } },
        { isDefault: false }
      );
    }

    const updatedTemplate = await EmailTemplate.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ message: 'Email template updated successfully', template: updatedTemplate });
  } catch (error) {
    res.status(400).json({ message: 'Error updating email template', error: error.message });
  }
};

export const deleteEmailTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await EmailTemplate.findByIdAndDelete(id);

    if (!template) {
      return res.status(404).json({ message: 'Email template not found' });
    }

    res.json({ message: 'Email template deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting email template', error: error.message });
  }
};

// Backup Configuration Controllers
export const getBackupConfigs = async (req, res) => {
  try {
    const { isActive, frequency } = req.query;
    
    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (frequency) filter['schedule.frequency'] = frequency;

    const configs = await BackupConfig.find(filter)
      .populate('createdBy', 'name email')
      .populate('notifications.recipients', 'name email')
      .sort({ name: 1 });

    res.json({ configs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching backup configurations', error: error.message });
  }
};

export const createBackupConfig = async (req, res) => {
  try {
    const configData = {
      ...req.body,
      createdBy: req.user.id
    };

    const config = new BackupConfig(configData);
    await config.save();

    res.status(201).json({ message: 'Backup configuration created successfully', config });
  } catch (error) {
    res.status(400).json({ message: 'Error creating backup configuration', error: error.message });
  }
};

export const updateBackupConfig = async (req, res) => {
  try {
    const { id } = req.params;
    const config = await BackupConfig.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!config) {
      return res.status(404).json({ message: 'Backup configuration not found' });
    }

    res.json({ message: 'Backup configuration updated successfully', config });
  } catch (error) {
    res.status(400).json({ message: 'Error updating backup configuration', error: error.message });
  }
};

export const runBackup = async (req, res) => {
  try {
    const { id } = req.params;
    const config = await BackupConfig.findById(id);

    if (!config) {
      return res.status(404).json({ message: 'Backup configuration not found' });
    }

    if (!config.isActive) {
      return res.status(400).json({ message: 'Backup configuration is not active' });
    }

    // In a real implementation, this would trigger the actual backup process
    // For now, we'll simulate a backup run
    config.lastRun = {
      date: new Date(),
      status: 'success',
      size: Math.floor(Math.random() * 1000000000), // Random size
      duration: Math.floor(Math.random() * 300000) // Random duration up to 5 minutes
    };

    await config.save();

    res.json({ message: 'Backup initiated successfully', config });
  } catch (error) {
    res.status(500).json({ message: 'Error running backup', error: error.message });
  }
};

export const getAdminDashboard = async (req, res) => {
  try {
    // System configurations by category
    const configStats = await SystemConfig.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          editableCount: {
            $sum: { $cond: ['$isEditable', 1, 0] }
          }
        }
      }
    ]);

    // Active themes
    const activeThemes = await ThemeConfig.countDocuments({ isActive: true });
    const defaultTheme = await ThemeConfig.findOne({ isDefault: true }).select('name');

    // Email templates by category
    const emailTemplateStats = await EmailTemplate.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          activeCount: {
            $sum: { $cond: ['$isActive', 1, 0] }
          }
        }
      }
    ]);

    // Backup configurations
    const backupStats = {
      total: await BackupConfig.countDocuments(),
      active: await BackupConfig.countDocuments({ isActive: true }),
      lastSuccessful: await BackupConfig.findOne({
        'lastRun.status': 'success'
      }).sort({ 'lastRun.date': -1 }).select('name lastRun')
    };

    // Recent system changes
    const recentChanges = await SystemConfig.find({
      'lastModified.date': {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
      }
    })
    .populate('lastModified.by', 'name email')
    .sort({ 'lastModified.date': -1 })
    .limit(5)
    .select('category key value lastModified');

    res.json({
      configStats,
      themeStats: {
        active: activeThemes,
        default: defaultTheme
      },
      emailTemplateStats,
      backupStats,
      recentChanges
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin dashboard', error: error.message });
  }
};
