import Staff from '../../models/Staff.js';
import Department from '../../models/Department.js';
import Attendance from '../../models/Attendance.js';

// Staff Controllers
export const getStaff = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      department, 
      position, 
      status, 
      search 
    } = req.query;
    
    const filter = {};
    if (department) filter.department = department;
    if (position) filter['employment.position'] = position;
    if (status) filter['employment.status'] = status;
    
    if (search) {
      filter.$or = [
        { 'personalInfo.firstName': { $regex: search, $options: 'i' } },
        { 'personalInfo.lastName': { $regex: search, $options: 'i' } },
        { 'personalInfo.email': { $regex: search, $options: 'i' } },
        { 'personalInfo.phone': { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } }
      ];
    }

    const staff = await Staff.find(filter)
      .populate('department', 'name budget')
      .populate('employment.supervisor', 'personalInfo.firstName personalInfo.lastName')
      .sort({ 'personalInfo.firstName': 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Staff.countDocuments(filter);

    res.json({
      staff,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff', error: error.message });
  }
};

export const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findById(id)
      .populate('department', 'name budget workingHours')
      .populate('employment.supervisor', 'personalInfo.firstName personalInfo.lastName employeeId')
      .populate('createdBy', 'name email');

    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    res.json({ staff });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff member', error: error.message });
  }
};

export const createStaff = async (req, res) => {
  try {
    const staffData = {
      ...req.body,
      createdBy: req.user.id
    };

    const staff = new Staff(staffData);
    await staff.save();

    // Update department employee count
    if (staff.department) {
      await Department.findByIdAndUpdate(
        staff.department,
        { $inc: { employeeCount: 1 } }
      );
    }

    res.status(201).json({ message: 'Staff member created successfully', staff });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Employee ID or email already exists' });
    }
    res.status(400).json({ message: 'Error creating staff member', error: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const oldStaff = await Staff.findById(id);
    
    if (!oldStaff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    const staff = await Staff.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).populate('department', 'name budget');

    // Update department employee counts if department changed
    if (oldStaff.department && oldStaff.department.toString() !== staff.department?.toString()) {
      await Department.findByIdAndUpdate(
        oldStaff.department,
        { $inc: { employeeCount: -1 } }
      );
      
      if (staff.department) {
        await Department.findByIdAndUpdate(
          staff.department,
          { $inc: { employeeCount: 1 } }
        );
      }
    }

    res.json({ message: 'Staff member updated successfully', staff });
  } catch (error) {
    res.status(400).json({ message: 'Error updating staff member', error: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findById(id);

    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    // Update department employee count
    if (staff.department) {
      await Department.findByIdAndUpdate(
        staff.department,
        { $inc: { employeeCount: -1 } }
      );
    }

    await Staff.findByIdAndDelete(id);

    res.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting staff member', error: error.message });
  }
};

export const updateStaffPerformance = async (req, res) => {
  try {
    const { id } = req.params;
    const { performanceData } = req.body;

    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    staff.performance.push({
      ...performanceData,
      reviewedBy: req.user.id
    });

    await staff.save();

    res.json({ message: 'Performance record added successfully', staff });
  } catch (error) {
    res.status(400).json({ message: 'Error updating performance', error: error.message });
  }
};

// Department Controllers
export const getDepartments = async (req, res) => {
  try {
    const { search, isActive } = req.query;
    
    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const departments = await Department.find(filter)
      .populate('head', 'personalInfo.firstName personalInfo.lastName employeeId')
      .sort({ name: 1 });

    res.json({ departments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments', error: error.message });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const departmentData = {
      ...req.body,
      createdBy: req.user.id
    };

    const department = new Department(departmentData);
    await department.save();

    res.status(201).json({ message: 'Department created successfully', department });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Department with this name already exists' });
    }
    res.status(400).json({ message: 'Error creating department', error: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).populate('head', 'personalInfo.firstName personalInfo.lastName');

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json({ message: 'Department updated successfully', department });
  } catch (error) {
    res.status(400).json({ message: 'Error updating department', error: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if department has active employees
    const activeEmployees = await Staff.countDocuments({ 
      department: id, 
      'employment.status': 'active' 
    });

    if (activeEmployees > 0) {
      return res.status(400).json({ 
        message: `Cannot delete department with ${activeEmployees} active employees` 
      });
    }

    const department = await Department.findByIdAndDelete(id);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting department', error: error.message });
  }
};

// Attendance Controllers
export const getAttendance = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      employee, 
      date, 
      startDate, 
      endDate,
      department,
      status 
    } = req.query;
    
    const filter = {};
    if (employee) filter.employee = employee;
    if (department) {
      // Get employees from specific department
      const departmentEmployees = await Staff.find({ department }).select('_id');
      filter.employee = { $in: departmentEmployees.map(emp => emp._id) };
    }
    if (status) filter.status = status;
    
    if (date) {
      const targetDate = new Date(date);
      filter.date = {
        $gte: new Date(targetDate.setHours(0, 0, 0, 0)),
        $lte: new Date(targetDate.setHours(23, 59, 59, 999))
      };
    } else if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const attendance = await Attendance.find(filter)
      .populate('employee', 'personalInfo.firstName personalInfo.lastName employeeId department')
      .populate('employee.department', 'name')
      .sort({ date: -1, 'employee.personalInfo.firstName': 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Attendance.countDocuments(filter);

    res.json({
      attendance,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error: error.message });
  }
};

export const markAttendance = async (req, res) => {
  try {
    const { employeeId, type, location, notes } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if attendance already exists for today
    let attendance = await Attendance.findOne({
      employee: employeeId,
      date: {
        $gte: today,
        $lte: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (!attendance) {
      attendance = new Attendance({
        employee: employeeId,
        date: new Date()
      });
    }

    const currentTime = new Date();

    if (type === 'check-in') {
      attendance.checkIn = currentTime;
      attendance.status = 'present';
    } else if (type === 'check-out') {
      if (!attendance.checkIn) {
        return res.status(400).json({ message: 'Cannot check out without checking in' });
      }
      attendance.checkOut = currentTime;
    } else if (type === 'break-start') {
      attendance.breaks.push({ start: currentTime });
    } else if (type === 'break-end') {
      const lastBreak = attendance.breaks[attendance.breaks.length - 1];
      if (!lastBreak || lastBreak.end) {
        return res.status(400).json({ message: 'No active break to end' });
      }
      lastBreak.end = currentTime;
    }

    if (location) attendance.location = location;
    if (notes) attendance.notes = notes;

    await attendance.save();

    res.json({ message: 'Attendance marked successfully', attendance });
  } catch (error) {
    res.status(400).json({ message: 'Error marking attendance', error: error.message });
  }
};

export const getAttendanceSummary = async (req, res) => {
  try {
    const { employeeId, month, year } = req.query;
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const attendance = await Attendance.find({
      employee: employeeId,
      date: { $gte: startDate, $lte: endDate }
    }).populate('employee', 'personalInfo.firstName personalInfo.lastName');

    const summary = {
      totalDays: endDate.getDate(),
      presentDays: attendance.filter(a => a.status === 'present').length,
      absentDays: attendance.filter(a => a.status === 'absent').length,
      lateDays: attendance.filter(a => a.isLate).length,
      totalWorkingHours: attendance.reduce((total, a) => total + (a.totalHours || 0), 0),
      averageWorkingHours: 0
    };

    summary.averageWorkingHours = summary.presentDays > 0 
      ? (summary.totalWorkingHours / summary.presentDays).toFixed(2) 
      : 0;

    res.json({ summary, attendance });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance summary', error: error.message });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).populate('employee', 'personalInfo.firstName personalInfo.lastName');

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.json({ message: 'Attendance updated successfully', attendance });
  } catch (error) {
    res.status(400).json({ message: 'Error updating attendance', error: error.message });
  }
};

export const getStaffDashboard = async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Total staff count
    const totalStaff = await Staff.countDocuments({ 'employment.status': 'active' });

    // Department wise staff count
    const departmentStats = await Staff.aggregate([
      { $match: { 'employment.status': 'active' } },
      {
        $lookup: {
          from: 'departments',
          localField: 'department',
          foreignField: '_id',
          as: 'departmentInfo'
        }
      },
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 },
          departmentName: { $first: '$departmentInfo.name' }
        }
      }
    ]);

    // Today's attendance
    const todayAttendance = await Attendance.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(today.setHours(0, 0, 0, 0)),
            $lte: new Date(today.setHours(23, 59, 59, 999))
          }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // This month's attendance summary
    const monthlyAttendance = await Attendance.aggregate([
      { $match: { date: { $gte: startOfMonth } } },
      {
        $group: {
          _id: null,
          totalPresent: {
            $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] }
          },
          totalAbsent: {
            $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] }
          },
          totalLate: {
            $sum: { $cond: ['$isLate', 1, 0] }
          }
        }
      }
    ]);

    res.json({
      totalStaff,
      departmentStats,
      todayAttendance,
      monthlyAttendance: monthlyAttendance[0] || { totalPresent: 0, totalAbsent: 0, totalLate: 0 }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff dashboard', error: error.message });
  }
};
