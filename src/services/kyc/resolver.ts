
import __KYC, { IKyc } from "../../models/Kyc.js";
import UserDatasource from "./datasource.js";



export const KycMutation = {

  async verifyNIN(__, { validationNumber }: { validationNumber: string }): Promise<any> {
    return await new UserDatasource().verifyNIN(validationNumber);
  },

  async verifyBVN(__, { validationNumber }: { validationNumber: string }): Promise<any> {
    return await new UserDatasource().verifyBVN(validationNumber);
  },

  async verifyPassport(__, { validationNumber }: { validationNumber: string }): Promise<any> {
    return await new UserDatasource().verifyPassport(validationNumber);
  },

  async verifyDrivingLincence(__, { validationNumber }: { validationNumber: string }): Promise<any> {
    return await new UserDatasource().verifyDrivingLincence(validationNumber);

  },

  async createKyc(__, data: { validationNumber: string, kycType: string }): Promise<any> {
    return await new UserDatasource().createKyc(data)
  }



};

export const KycQuery = {
  //Get single kyc by id
  async getKycs(): Promise<IKyc[]> {
    return
  }
}
