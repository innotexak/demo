import mongoose, { Schema, Document, model, ObjectId } from "mongoose";

// Define the fields of your schema
export interface IKyc extends Document {
  userId: ObjectId,
  validationNumber: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  dateOfBirth: Date,
  status: string,
  gender: 'male' | 'female',
  kycType: "bvn" | "nin" | "passport" | "drivingLicence"
}

const KycSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  validationNumber: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum: ["male", 'female'],
    required: true,
  },

  kycType: {
    type: String,
    enum: ["bvn", "nin", "passport", "drivingLicence"],
    required: true,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },

},

  {
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: { virtuals: true, versionKey: false },
  });

// Create and export the mongoose model
// export const KycModel = mongoose.model<IKyc>("Kyc", KycSchema);

export default model<IKyc>("Kycs", KycSchema);
