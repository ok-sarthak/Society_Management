import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: [true, 'Employee reference is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  checkIn: {
    time: Date,
    location: String,
    method: {
      type: String,
      enum: ['manual', 'biometric', 'card', 'mobile'],
      default: 'manual'
    }
  },
  checkOut: {
    time: Date,
    location: String,
    method: {
      type: String,
      enum: ['manual', 'biometric', 'card', 'mobile'],
      default: 'manual'
    }
  },
  breaks: [{
    breakOut: Date,
    breakIn: Date,
    reason: String
  }],
  workingHours: {
    type: Number,
    default: 0
  },
  overtimeHours: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'half-day', 'leave'],
    default: 'absent'
  },
  leaveType: {
    type: String,
    enum: ['sick', 'casual', 'annual', 'maternity', 'paternity', 'emergency'],
    required: function() {
      return this.status === 'leave';
    }
  },
  notes: {
    type: String,
    trim: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Compound index to ensure one record per employee per day
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

// Index for efficient querying
attendanceSchema.index({ date: -1 });
attendanceSchema.index({ status: 1 });
attendanceSchema.index({ employee: 1, date: -1 });

// Calculate working hours before saving
attendanceSchema.pre('save', function(next) {
  if (this.checkIn.time && this.checkOut.time) {
    const workingMs = this.checkOut.time - this.checkIn.time;
    
    // Subtract break time
    const breakMs = this.breaks.reduce((total, breakItem) => {
      if (breakItem.breakOut && breakItem.breakIn) {
        return total + (breakItem.breakIn - breakItem.breakOut);
      }
      return total;
    }, 0);
    
    const netWorkingMs = workingMs - breakMs;
    this.workingHours = Math.max(0, netWorkingMs / (1000 * 60 * 60)); // Convert to hours
    
    // Calculate overtime (assuming 8 hours is standard)
    this.overtimeHours = Math.max(0, this.workingHours - 8);
    
    // Determine status based on timing
    if (this.workingHours > 0) {
      this.status = this.workingHours >= 4 ? 'present' : 'half-day';
      
      // Check if late (assuming 9:30 AM is standard start time)
      const checkInHour = this.checkIn.time.getHours();
      const checkInMinute = this.checkIn.time.getMinutes();
      if (checkInHour > 9 || (checkInHour === 9 && checkInMinute > 30)) {
        this.status = 'late';
      }
    }
  }
  next();
});

export default mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);
