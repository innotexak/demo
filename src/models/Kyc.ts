import mongoose, { Schema, Document, model, ObjectId } from "mongoose";

// Define the fields of your schema
export interface IKyc extends Document {
  validationNumber: string,
  kycType: "bvn" | "nin" | "passport" | "drivingLicence";
}

const KycSchema: Schema = new Schema({


  validationNumber: {
    type: String,
    required: true,
    unique: true,
  },

  kycType: {
    type: String,
    enum: ["bvn", "nin", "passport", "drivingLicence"],
    required: true,
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
