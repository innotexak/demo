import Base from '../../Base.js'
import { ErrorHandler } from '../../helpers/ErrorHandler.js'
import __Merchant from '../../models/merchant.js'
import { IMerchant } from './interfaces.js'


class MerchantDatasource extends Base {


    async createMerchant(data: any): Promise<string> {

        const keys = await this.generateUniqueApiKeys()

        const create = await __Merchant.create({
            ...keys,
            ...data
        })
        if (create) return "Merchant created successfully"
    }

    async fetchMerchant(): Promise<IMerchant[]> {
        return await __Merchant.find({})

    }

    async createKyc(data): Promise<any> {
        return await __Merchant.create(data)
    }

    async fetchSingleMerchant(merchantId: string): Promise<any> {
        const data = await __Merchant.findOne({ merchantId })
        if (!data) throw new ErrorHandler().ValidationError("Invalid merchant credential provided")
        return data
    }

}


export default MerchantDatasource
