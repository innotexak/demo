
import __KYC, { IKyc } from "../../models/Kyc.js";
import UserDatasource from "./datasource.js";
import { ICreateKyc } from './interfaces.js'



export const KycMutation = {

  async verifyNIN(__: unknown, { validationNumber }: { validationNumber: string }): Promise<any> {
    return await new UserDatasource().verifyNIN(validationNumber);
  },

  async verifyBVN(__: unknown, { validationNumber }: { validationNumber: string }): Promise<any> {
    return await new UserDatasource().verifyBVN(validationNumber);
  },

  async verifyPassport(__: unknown, { validationNumber }: { validationNumber: string }): Promise<any> {
    return await new UserDatasource().verifyPassport(validationNumber);
  },

  async verifyDrivingLincence(__: unknown, { validationNumber }: { validationNumber: string }): Promise<any> {
    return await new UserDatasource().verifyDrivingLincence(validationNumber);

  },

  async createKyc(__: unknown, { values }: { values: ICreateKyc }): Promise<String> {


    return await new UserDatasource().createKyc(values)
  }



};

export const KycQuery = {
  //Get single kyc by id
  async getKycs(): Promise<IKyc[]> {
    return
  }
}
