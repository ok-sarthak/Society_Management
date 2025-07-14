import mongoose from 'mongoose';

const updatedMemberSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MemberList',
    required: true
  },
  updatedBy: {
    type: String, // Or ObjectId if tracking admins/users
    required: true
  },
  updateType: {
    type: String,
    enum: ['edit', 'correction', 'migration'],
    default: 'edit'
  },
  changes: [
    {
      field: { type: String, required: true },
      oldValue: { type: mongoose.Schema.Types.Mixed },
      newValue: { type: mongoose.Schema.Types.Mixed }
    }
  ],
  note: {
    type: String // Optional admin note about the change
  }
}, { timestamps: true });

export default mongoose.model('UpdatedMember', updatedMemberSchema);
