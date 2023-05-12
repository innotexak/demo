
import __KYC, { IKyc } from "../../models/Kyc.js";
import merchant from "../../models/merchant.js";
import UserDatasource from "./datasource.js";
import { ICreateKyc, ITranactionInit } from './interfaces.js'



export const KycMutation = {

  async InitTransaction(__: unknown, { userRef, merchantId }: ITranactionInit): Promise<String> {
    return await new UserDatasource().InitTransaction(userRef, merchantId)
  },

  async InitializeVerification(__: unknown, { userRef, merchantId }: ITranactionInit): Promise<any> {
    return await new UserDatasource().InitializeVerification(userRef, merchantId);
  },

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
