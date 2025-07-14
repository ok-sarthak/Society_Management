import mongoose from "mongoose";

const memberListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    sex: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    relationWithPrimaryOwner: {
        type: String,
        required: true,
        enum: ['Self', 'Spouse', 'Child', 'Parent', 'Sibling', 'Other']
    },
    aadharNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{12}$/, 'Please enter a valid 12-digit Aadhar number']
    },
    panNumber: {
        type: String,
        match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please enter a valid PAN number']
    },
    buildingNumber: {
        type: Number,
        required: true,
        min: 1
    },
    blockNumber: {
        type: Number,
        required: true,
        min: 1
    },
    floorNumber: {
        type: Number,
        required: true,
        min: 0
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    memberType: {
        type: String,
        enum: ['owner', 'tenant', 'family', 'staff'],
        default: 'owner'
    },
    isPrimaryOwner: {
        type: Boolean,
        default: false
    },
    memberID: {
        type: String,
        unique: true,
        sparse: true
    },
    moveInDate: {
        type: Date,
        default: Date.now
    },
    moveOutDate: {
        type: Date
    },
    passportNumber: {
        type: String
    },
    idProofUrl: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    emergencyContact: {
        name: String,
        relationship: String,
        phoneNumber: String
    },
    vehicleDetails: [{
        vehicleType: {
            type: String,
            enum: ['Car', 'Bike', 'Scooter', 'Bicycle', 'Other']
        },
        vehicleNumber: String,
        parkingSlot: String
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Generate unique member ID before saving
memberListSchema.pre('save', async function(next) {
    if (!this.memberID) {
        let attempts = 0;
        const maxAttempts = 10;
        
        while (attempts < maxAttempts) {
            try {
                const count = await this.constructor.countDocuments();
                const newMemberID = `MEM${(count + 1 + attempts).toString().padStart(4, '0')}`;
                
                // Check if this memberID already exists
                const existingMember = await this.constructor.findOne({ memberID: newMemberID });
                if (!existingMember) {
                    this.memberID = newMemberID;
                    break;
                }
                attempts++;
            } catch (error) {
                attempts++;
                if (attempts >= maxAttempts) {
                    // Fallback to timestamp-based ID
                    this.memberID = `MEM${Date.now().toString().slice(-8)}`;
                }
            }
        }
    }
    next();
});

// Index for efficient querying
memberListSchema.index({ buildingNumber: 1, blockNumber: 1, floorNumber: 1 });
memberListSchema.index({ email: 1 });

export default mongoose.model("MemberList", memberListSchema);