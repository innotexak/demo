
import UserDatasource from "./datasource.js";
import { ICreateM, IMerchant } from "./interfaces.js";


export const MerchantMutation = {

  async createMerchant(__: unknown, { merchantId, firstName, lastName }: ICreateM): Promise<String> {

    return await new UserDatasource().createMerchant({ merchantId, firstName, lastName })
  },



};

export const MerchantQuery = {
  async getMerchants(__: unknown): Promise<IMerchant[]> {
    return new UserDatasource().fetchMerchant()


  },

  async getMerchantById(__: unknown, { merchantId }: { merchantId: string }): Promise<IMerchant> {
    return new UserDatasource().fetchSingleMerchant(merchantId)


  }
}
