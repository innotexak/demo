import { ObjectId } from "mongoose";

interface UserInput {
  kycId: string;
  kycType: string;
  secretKey: string;
}

interface ICreateKyc {
  validationNumber: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  dateOfBirth: Date,
  status: string,
  gender: 'male' | 'female',
  kycType: "bvn" | "nin" | "passport" | "drivingLicence"
}

interface ITranactionInit {
  userRef: string,
  merchantId: string
}


export { UserInput, ICreateKyc, ITranactionInit };
