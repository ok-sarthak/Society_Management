import CoCurricularActivity from '../../models/CoCurricularActivity.js';

// Co-Curricular Activities Controllers
export const getActivities = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      type, 
      status, 
      ageGroup,
      instructor,
      search 
    } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (ageGroup) filter.ageGroups = { $in: [ageGroup] };
    if (instructor) filter['instructor.name'] = { $regex: instructor, $options: 'i' };
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'instructor.name': { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const activities = await CoCurricularActivity.find(filter)
      .populate('participants.member', 'name email flatNumber')
      .populate('createdBy', 'name email')
      .sort({ 'schedule.startDate': 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await CoCurricularActivity.countDocuments(filter);

    res.json({
      activities,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activities', error: error.message });
  }
};

export const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await CoCurricularActivity.findById(id)
      .populate('participants.member', 'name email flatNumber phone')
      .populate('feedback.participant', 'name email')
      .populate('createdBy', 'name email');

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.json({ activity });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity', error: error.message });
  }
};

export const createActivity = async (req, res) => {
  try {
    const activityData = {
      ...req.body,
      createdBy: req.user.id
    };

    const activity = new CoCurricularActivity(activityData);
    await activity.save();

    res.status(201).json({ message: 'Activity created successfully', activity });
  } catch (error) {
    res.status(400).json({ message: 'Error creating activity', error: error.message });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await CoCurricularActivity.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).populate('participants.member', 'name email');

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.json({ message: 'Activity updated successfully', activity });
  } catch (error) {
    res.status(400).json({ message: 'Error updating activity', error: error.message });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await CoCurricularActivity.findById(id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    if (activity.participants.length > 0 && activity.status === 'ongoing') {
      return res.status(400).json({ 
        message: 'Cannot delete ongoing activity with enrolled participants' 
      });
    }

    await CoCurricularActivity.findByIdAndDelete(id);

    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting activity', error: error.message });
  }
};

export const enrollParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberId } = req.body;

    const activity = await CoCurricularActivity.findById(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Check if enrollment is full
    if (activity.isEnrollmentFull) {
      return res.status(400).json({ message: 'Activity enrollment is full' });
    }

    // Check if member is already enrolled
    const isAlreadyEnrolled = activity.participants.some(
      p => p.member.toString() === memberId && p.status === 'active'
    );

    if (isAlreadyEnrolled) {
      return res.status(400).json({ message: 'Member is already enrolled in this activity' });
    }

    activity.participants.push({
      member: memberId,
      status: 'active'
    });

    await activity.save();

    res.json({ message: 'Participant enrolled successfully', activity });
  } catch (error) {
    res.status(400).json({ message: 'Error enrolling participant', error: error.message });
  }
};

export const updateParticipantStatus = async (req, res) => {
  try {
    const { id, participantId } = req.params;
    const { status, feedback } = req.body;

    const activity = await CoCurricularActivity.findById(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const participant = activity.participants.find(p => p._id.toString() === participantId);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    participant.status = status;
    if (feedback) {
      participant.progress.feedback = feedback;
    }

    await activity.save();

    res.json({ message: 'Participant status updated successfully', activity });
  } catch (error) {
    res.status(400).json({ message: 'Error updating participant status', error: error.message });
  }
};

export const markAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { participantId, date, present, notes } = req.body;

    const activity = await CoCurricularActivity.findById(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const participant = activity.participants.find(p => p._id.toString() === participantId);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    // Check if attendance already marked for this date
    const existingAttendance = participant.attendance.find(
      a => a.date.toDateString() === new Date(date).toDateString()
    );

    if (existingAttendance) {
      existingAttendance.present = present;
      existingAttendance.notes = notes;
    } else {
      participant.attendance.push({
        date: new Date(date),
        present,
        notes
      });
    }

    await activity.save();

    res.json({ message: 'Attendance marked successfully', activity });
  } catch (error) {
    res.status(400).json({ message: 'Error marking attendance', error: error.message });
  }
};

export const addFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const activity = await CoCurricularActivity.findById(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Check if user is enrolled in this activity
    const isEnrolled = activity.participants.some(
      p => p.member.toString() === req.user.id && p.status === 'active'
    );

    if (!isEnrolled) {
      return res.status(400).json({ message: 'You must be enrolled to provide feedback' });
    }

    // Check if user already provided feedback
    const existingFeedback = activity.feedback.find(
      f => f.participant.toString() === req.user.id
    );

    if (existingFeedback) {
      return res.status(400).json({ message: 'You have already provided feedback for this activity' });
    }

    activity.feedback.push({
      participant: req.user.id,
      rating,
      comment
    });

    await activity.save();

    res.json({ message: 'Feedback added successfully', activity });
  } catch (error) {
    res.status(400).json({ message: 'Error adding feedback', error: error.message });
  }
};

export const getActivityStats = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await CoCurricularActivity.findById(id)
      .populate('participants.member', 'name');

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Calculate attendance statistics
    const attendanceStats = activity.participants.map(participant => {
      const totalSessions = participant.attendance.length;
      const presentSessions = participant.attendance.filter(a => a.present).length;
      const attendancePercentage = totalSessions > 0 ? (presentSessions / totalSessions) * 100 : 0;

      return {
        participant: participant.member,
        totalSessions,
        presentSessions,
        attendancePercentage: attendancePercentage.toFixed(2)
      };
    });

    // Overall statistics
    const totalParticipants = activity.participants.filter(p => p.status === 'active').length;
    const averageRating = activity.averageRating;
    const totalFeedback = activity.feedback.length;

    res.json({
      activity: {
        title: activity.title,
        category: activity.category,
        instructor: activity.instructor.name
      },
      stats: {
        totalParticipants,
        averageRating,
        totalFeedback,
        attendanceStats
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity stats', error: error.message });
  }
};

export const getCoCurricularDashboard = async (req, res) => {
  try {
    // Total activities by status
    const activityStatusStats = await CoCurricularActivity.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Activities by category
    const categoryStats = await CoCurricularActivity.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalParticipants: { $sum: '$enrollment.currentEnrollment' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Popular activities (by enrollment)
    const popularActivities = await CoCurricularActivity.find()
      .select('title category enrollment.currentEnrollment enrollment.maxParticipants averageRating')
      .sort({ 'enrollment.currentEnrollment': -1 })
      .limit(5);

    // Upcoming activities
    const upcomingActivities = await CoCurricularActivity.find({
      'schedule.startDate': { $gte: new Date() },
      status: { $in: ['registration-open', 'planning'] }
    })
      .select('title category schedule.startDate instructor.name enrollment')
      .sort({ 'schedule.startDate': 1 })
      .limit(5);

    // Total participants across all activities
    const totalParticipants = await CoCurricularActivity.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$enrollment.currentEnrollment' }
        }
      }
    ]);

    res.json({
      activityStatusStats,
      categoryStats,
      popularActivities,
      upcomingActivities,
      totalParticipants: totalParticipants[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching co-curricular dashboard', error: error.message });
  }
};
