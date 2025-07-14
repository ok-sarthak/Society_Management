import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SupportStaff',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  checkIn: {
    type: Date
  },
  checkOut: {
    type: Date
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'half_day', 'on_leave'],
    default: 'present'
  },
  workingHours: {
    type: Number,
    default: 0
  },
  overtimeHours: {
    type: Number,
    default: 0
  },
  remarks: {
    type: String
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Calculate working hours before saving
attendanceSchema.pre('save', function(next) {
  if (this.checkIn && this.checkOut) {
    const workingMs = this.checkOut - this.checkIn;
    this.workingHours = Math.floor(workingMs / (1000 * 60 * 60 * 100)) / 100; // Convert to hours with 2 decimal places
    
    // Standard working hours (8 hours)
    if (this.workingHours > 8) {
      this.overtimeHours = this.workingHours - 8;
    }
  }
  next();
});

// Index for efficient querying
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });
attendanceSchema.index({ date: 1 });
attendanceSchema.index({ status: 1 });

export default mongoose.model('Attendance', attendanceSchema);
