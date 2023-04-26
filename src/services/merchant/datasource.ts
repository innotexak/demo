import Base from '../../Base.js'
import { ErrorHandler } from '../../helpers/ErrorHandler.js'
import __Merchant from '../../models/merchant.js'


class MerchantDatasource extends Base {


    async createMerchant(data): Promise<any> {

        const keys = await this.generateUniqueApiKeys()

        const create = await __Merchant.create({
            ...keys,
            ...data
        })
        if (create) return create
    }

    async fetchMerchant(): Promise<any> {
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
