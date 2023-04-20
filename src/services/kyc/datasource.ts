import { Types } from 'mongoose'
import Base from '../../Base.js'

import { ErrorHandler } from '../../helpers/ErrorHandler.js'

import __Kyc from '../../models/Kyc.js'

class LevelsDatasource extends Base {


  async verifyNIN(validationNumber): Promise<any> {
    const data = __Kyc.findOne({ validationNumber })
    if (!data) throw new ErrorHandler().UserInputError('Invalid  NIN provided')
    return data
  }
  async verifyBVN(validationNumber): Promise<any> {
    const data = __Kyc.findOne({ validationNumber })
    if (!data) throw new ErrorHandler().UserInputError('Invalid BVN provided')
    return data
  }

  async verifyPassport(validationNumber): Promise<any> {
    const data = __Kyc.findOne({ validationNumber })
    if (!data) throw new ErrorHandler().UserInputError('Invalid data provided')
    return data
  }

  async verifyDrivingLincence(validationNumber): Promise<any> {
    const data = __Kyc.findOne({ validationNumber })
    if (!data) throw new ErrorHandler().UserInputError('Invalid driving lincence provided')
    return data
  }

  async createKyc(data): Promise<any> {
    return await __Kyc.create(data)
  }

}



export default LevelsDatasource
