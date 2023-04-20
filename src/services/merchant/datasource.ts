import Base from '../../Base.js'
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
}

export default MerchantDatasource
