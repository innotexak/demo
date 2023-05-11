import mongoose, { Schema, Document, model, ObjectId } from "mongoose";

// Define the fields of your schema
export interface IKyc extends Document {
  merchantId: ObjectId,
  validationNumber: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  dateOfBirth: Date,
  status: string,
  userRef: string,
  gender: 'male' | 'female',
  kycType: "bvn" | "nin" | "passport" | "drivingLicence"
}

const KycSchema: Schema = new Schema({
  merchantId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  userRef: {
    type: String,
    required: true
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




// const userSchema = new mongoose.Schema({

//   userRef: {
//     type: String,
//     required: true
//   },


//   kyc: [{
//     type: Schema.Types.ObjectId,
//     ref: 'KYC'
//   }]
// },
//   {
//     versionKey: false,
//     timestamps: true,
//     toObject: {
//       virtuals: true,
//     },
//     toJSON: { virtuals: true, versionKey: false },
//   });

// const User = mongoose.model('User', userSchema);



export default model<IKyc>("Kycs", KycSchema);
