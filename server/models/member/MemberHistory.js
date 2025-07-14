import mongoose from 'mongoose';

const memberHistorySchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MemberList',
    required: true
  },
  status: {
    type: String,
    enum: ['resigned', 'transferred', 'deceased', 'removed', 'inactive'],
    required: true
  },
  leftAt: {
    type: Date,
    required: true
  },
  reason: {
    type: String // E.g., "Moved to another city", "Ownership transferred", etc.
  },
  updatedBy: {
    type: String, // Could be user ID or admin name
    required: true
  },
  forwardingAddress: {
    type: String // Optional: new address if known
  },
  contactAfterLeaving: {
    type: String // Optional alternate phone/email
  },
  isVerifiedExit: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('MemberHistory', memberHistorySchema);
