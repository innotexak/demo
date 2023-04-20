
import UserDatasource from "./datasource.js";

type KeyType = 'publicKey' | 'secretKey';
type ICreateM = {
  firstName: string,
  lastName: string,

}
export const MerchantMutation = {

  async createMerchant(__: unknown, { firstName, lastName }: ICreateM): Promise<any> {

    return await new UserDatasource().createMerchant({ firstName, lastName })
  },



};

export const MerchantQuery = {
  async getMerchantKyc(__: unknown): Promise<any> {
    return new UserDatasource().fetchMerchant()


  }
}
