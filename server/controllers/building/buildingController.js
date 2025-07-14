import Building from '../../models/Building.js';
import logger from '../../utils/logger.js';

// Get all buildings
export const getAllBuildings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, buildingType } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (buildingType) filter.buildingType = buildingType;

    const buildings = await Building.find(filter)
      .sort({ buildingNumber: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Building.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        buildings,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalRecords: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    logger.error('Error fetching buildings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch buildings',
      error: error.message
    });
  }
};

// Get building by ID
export const getBuildingById = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);

    if (!building) {
      return res.status(404).json({
        success: false,
        message: 'Building not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { building }
    });
  } catch (error) {
    logger.error('Error fetching building:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch building',
      error: error.message
    });
  }
};

// Create new building
export const createBuilding = async (req, res) => {
  try {
    const building = new Building(req.body);
    await building.save();

    logger.info(`Building created: ${building.buildingName} by user ${req.user.id}`);

    res.status(201).json({
      success: true,
      message: 'Building created successfully',
      data: { building }
    });
  } catch (error) {
    logger.error('Error creating building:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create building',
      error: error.message
    });
  }
};

// Update building
export const updateBuilding = async (req, res) => {
  try {
    const building = await Building.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!building) {
      return res.status(404).json({
        success: false,
        message: 'Building not found'
      });
    }

    logger.info(`Building updated: ${building.buildingName} by user ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Building updated successfully',
      data: { building }
    });
  } catch (error) {
    logger.error('Error updating building:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update building',
      error: error.message
    });
  }
};

// Delete building
export const deleteBuilding = async (req, res) => {
  try {
    const building = await Building.findByIdAndDelete(req.params.id);

    if (!building) {
      return res.status(404).json({
        success: false,
        message: 'Building not found'
      });
    }

    logger.info(`Building deleted: ${building.buildingName} by user ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Building deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting building:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete building',
      error: error.message
    });
  }
};

// Update maintenance schedule
export const updateMaintenanceSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { maintenanceSchedule } = req.body;

    const building = await Building.findByIdAndUpdate(
      id,
      { $set: { maintenanceSchedule } },
      { new: true, runValidators: true }
    );

    if (!building) {
      return res.status(404).json({
        success: false,
        message: 'Building not found'
      });
    }

    logger.info(`Maintenance schedule updated for building: ${building.buildingName}`);

    res.status(200).json({
      success: true,
      message: 'Maintenance schedule updated successfully',
      data: { building }
    });
  } catch (error) {
    logger.error('Error updating maintenance schedule:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update maintenance schedule',
      error: error.message
    });
  }
};

// Get building statistics
export const getBuildingStatistics = async (req, res) => {
  try {
    const stats = await Building.aggregate([
      {
        $group: {
          _id: null,
          totalBuildings: { $sum: 1 },
          totalUnits: { $sum: '$totalUnits' },
          averageFloors: { $avg: '$totalFloors' },
          buildingsByType: {
            $push: {
              type: '$buildingType',
              count: 1
            }
          }
        }
      }
    ]);

    const buildingTypeStats = await Building.aggregate([
      {
        $group: {
          _id: '$buildingType',
          count: { $sum: 1 },
          totalUnits: { $sum: '$totalUnits' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: stats[0] || {
          totalBuildings: 0,
          totalUnits: 0,
          averageFloors: 0
        },
        buildingsByType: buildingTypeStats
      }
    });
  } catch (error) {
    logger.error('Error fetching building statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch building statistics',
      error: error.message
    });
  }
};
