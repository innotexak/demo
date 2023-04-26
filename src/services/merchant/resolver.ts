
import UserDatasource from "./datasource.js";

type KeyType = 'publicKey' | 'secretKey';
type ICreateM = {
  merchantId: string,
  firstName: string,
  lastName: string,

}
export const MerchantMutation = {

  async createMerchant(__: unknown, { merchantId, firstName, lastName }: ICreateM): Promise<any> {

    return await new UserDatasource().createMerchant({ merchantId, firstName, lastName })
  },



};

export const MerchantQuery = {
  async getMerchants(__: unknown): Promise<any> {
    return new UserDatasource().fetchMerchant()


  },

  async getMerchantById(__: unknown, { merchantId }: { merchantId: string }): Promise<any> {
    return new UserDatasource().fetchSingleMerchant(merchantId)


  }
}
