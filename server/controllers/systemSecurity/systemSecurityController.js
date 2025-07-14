import SecurityLog from '../../models/SecurityLog.js';
import SystemSettings from '../../models/SystemSettings.js';

// Security Logs Controllers
export const getSecurityLogs = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      severity, 
      category, 
      source, 
      startDate, 
      endDate,
      search 
    } = req.query;
    
    const filter = {};
    
    if (severity) filter.severity = severity;
    if (category) filter.category = category;
    if (source) filter.source = source;
    
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }
    
    if (search) {
      filter.$or = [
        { event: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'user.username': { $regex: search, $options: 'i' } },
        { ipAddress: { $regex: search, $options: 'i' } }
      ];
    }

    const logs = await SecurityLog.find(filter)
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'name email username');

    const total = await SecurityLog.countDocuments(filter);

    // Get summary statistics
    const stats = await SecurityLog.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      logs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      stats
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching security logs', error: error.message });
  }
};

export const createSecurityLog = async (req, res) => {
  try {
    const logData = {
      ...req.body,
      user: req.user?.id,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    };

    const log = new SecurityLog(logData);
    await log.save();

    res.status(201).json({ message: 'Security log created successfully', log });
  } catch (error) {
    res.status(400).json({ message: 'Error creating security log', error: error.message });
  }
};

export const getSecurityLogById = async (req, res) => {
  try {
    const { id } = req.params;
    const log = await SecurityLog.findById(id).populate('user', 'name email username');

    if (!log) {
      return res.status(404).json({ message: 'Security log not found' });
    }

    res.json({ log });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching security log', error: error.message });
  }
};

export const getSecurityDashboard = async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Today's logs count by severity
    const todayStats = await SecurityLog.aggregate([
      { $match: { timestamp: { $gte: today } } },
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 }
        }
      }
    ]);

    // Failed login attempts in last 24 hours
    const failedLogins = await SecurityLog.countDocuments({
      event: 'login_failed',
      timestamp: { $gte: today }
    });

    // Top events this week
    const topEvents = await SecurityLog.aggregate([
      { $match: { timestamp: { $gte: lastWeek } } },
      {
        $group: {
          _id: '$event',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Recent critical events
    const criticalEvents = await SecurityLog.find({
      severity: 'critical',
      timestamp: { $gte: lastWeek }
    })
    .sort({ timestamp: -1 })
    .limit(5)
    .populate('user', 'name email');

    // Weekly trends
    const weeklyTrends = await SecurityLog.aggregate([
      { $match: { timestamp: { $gte: lastWeek } } },
      {
        $group: {
          _id: {
            $dayOfWeek: '$timestamp'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json({
      todayStats,
      failedLogins,
      topEvents,
      criticalEvents,
      weeklyTrends
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching security dashboard', error: error.message });
  }
};

export const clearOldLogs = async (req, res) => {
  try {
    const { days = 90 } = req.body;
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const result = await SecurityLog.deleteMany({
      timestamp: { $lt: cutoffDate },
      severity: { $ne: 'critical' } // Keep critical logs
    });

    res.json({ 
      message: `Cleared ${result.deletedCount} old security logs`,
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing old logs', error: error.message });
  }
};

// System Settings Controllers
export const getSystemSettings = async (req, res) => {
  try {
    const { category, key } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (key) filter.key = key;

    const settings = await SystemSettings.find(filter)
      .sort({ category: 1, key: 1 })
      .populate('lastModified.by', 'name email');

    res.json({ settings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching system settings', error: error.message });
  }
};

export const updateSystemSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const { value, reason } = req.body;

    const setting = await SystemSettings.findById(id);
    if (!setting) {
      return res.status(404).json({ message: 'System setting not found' });
    }

    // Store previous value in history
    setting.changeHistory.push({
      previousValue: setting.value,
      newValue: value,
      changedBy: req.user.id,
      reason
    });

    setting.value = value;
    setting.lastModified = {
      by: req.user.id,
      at: new Date()
    };
    setting.version += 1;

    await setting.save();

    res.json({ message: 'System setting updated successfully', setting });
  } catch (error) {
    res.status(400).json({ message: 'Error updating system setting', error: error.message });
  }
};

export const createSystemSetting = async (req, res) => {
  try {
    const settingData = {
      ...req.body,
      lastModified: {
        by: req.user.id,
        at: new Date()
      }
    };

    const setting = new SystemSettings(settingData);
    await setting.save();

    res.status(201).json({ message: 'System setting created successfully', setting });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Setting with this category and key already exists' });
    }
    res.status(400).json({ message: 'Error creating system setting', error: error.message });
  }
};

export const deleteSystemSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const setting = await SystemSettings.findById(id);

    if (!setting) {
      return res.status(404).json({ message: 'System setting not found' });
    }

    if (!setting.isDeletable) {
      return res.status(400).json({ message: 'This system setting cannot be deleted' });
    }

    await SystemSettings.findByIdAndDelete(id);

    res.json({ message: 'System setting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting system setting', error: error.message });
  }
};

export const getSettingHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const setting = await SystemSettings.findById(id)
      .populate('changeHistory.changedBy', 'name email')
      .populate('lastModified.by', 'name email');

    if (!setting) {
      return res.status(404).json({ message: 'System setting not found' });
    }

    res.json({ 
      setting: {
        category: setting.category,
        key: setting.key,
        description: setting.description,
        currentValue: setting.value,
        version: setting.version
      },
      history: setting.changeHistory 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching setting history', error: error.message });
  }
};

export const resetSystemSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const setting = await SystemSettings.findById(id);
    if (!setting) {
      return res.status(404).json({ message: 'System setting not found' });
    }

    if (!setting.defaultValue) {
      return res.status(400).json({ message: 'No default value available for this setting' });
    }

    // Store current value in history
    setting.changeHistory.push({
      previousValue: setting.value,
      newValue: setting.defaultValue,
      changedBy: req.user.id,
      reason: reason || 'Reset to default value'
    });

    setting.value = setting.defaultValue;
    setting.lastModified = {
      by: req.user.id,
      at: new Date()
    };
    setting.version += 1;

    await setting.save();

    res.json({ message: 'System setting reset to default successfully', setting });
  } catch (error) {
    res.status(400).json({ message: 'Error resetting system setting', error: error.message });
  }
};

export const getSystemStatus = async (req, res) => {
  try {
    // Get critical system settings
    const criticalSettings = await SystemSettings.find({
      category: 'system',
      key: { $in: ['maintenance_mode', 'system_status', 'max_users', 'backup_enabled'] }
    });

    // Recent security events
    const recentSecurityEvents = await SecurityLog.countDocuments({
      severity: { $in: ['high', 'critical'] },
      timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    // System health indicators
    const systemHealth = {
      database: 'healthy', // This would be determined by actual health checks
      storage: 'healthy',
      memory: 'healthy',
      cpu: 'healthy'
    };

    res.json({
      systemHealth,
      criticalSettings,
      recentSecurityEvents,
      lastUpdated: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching system status', error: error.message });
  }
};
