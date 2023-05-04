import Base from '../../Base.js'
import { ErrorHandler } from '../../helpers/ErrorHandler.js'
import __Kyc from '../../models/Kyc.js'
import { BvnValidation, DrivingLicenceValidation, KycsValidation, NinValidation, PassportValidation } from '../../validation/validation.js'
import { ICreateKyc } from './interfaces.js'

class LevelsDatasource extends Base {
  async verifyNIN(validationNumber: string): Promise<any> {
    await new NinValidation().validateNin({ validationNumber })
    const data = await __Kyc.findOne({ validationNumber })
    if (!data) throw new ErrorHandler().NotFoundError('Data not found')
    return data
  }

  async verifyBVN(validationNumber: string): Promise<any> {
    await new BvnValidation().validateBvn({ validationNumber })
    const data = await __Kyc.findOne({ validationNumber })
    if (!data) throw new ErrorHandler().NotFoundError('Data not found')
    return data
  }

  async verifyPassport(validationNumber: string): Promise<any> {
    await new PassportValidation().validatePassport({ validationNumber })
    const data = await __Kyc.findOne({ validationNumber })
    if (!data) throw new ErrorHandler().NotFoundError('Data not found')
    return data
  }

  async verifyDrivingLincence(validationNumber: string): Promise<any> {
    await new DrivingLicenceValidation().validateDrivingLicence({ validationNumber })
    const data = await __Kyc.findOne({ validationNumber })
    if (!data) throw new ErrorHandler().NotFoundError('Data not found')
    return data
  }

  async createKyc(data: ICreateKyc): Promise<String> {
    await new KycsValidation().createKyc(data)
    const created = await __Kyc.create(data)
    if (created) return "KYC created successfully"
  }

}



export default LevelsDatasource
