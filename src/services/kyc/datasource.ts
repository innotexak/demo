import { Types } from 'mongoose'
import Base from '../../Base.js'

import { ErrorHandler } from '../../helpers/ErrorHandler.js'

import __Kyc from '../../models/Kyc.js'
import { ValNumberValidation } from '../../validation/validation.js'

class LevelsDatasource extends Base {


  async verifyNIN(validationNumber: string): Promise<any> {
    await new ValNumberValidation().validateNumber({ validationNumber })
    const data = await __Kyc.findOne({ validationNumber })
    if (!data) throw new ErrorHandler().UserInputError('Invalid  NIN provided')
    return data
  }
  async verifyBVN(validationNumber: string): Promise<any> {
    await new ValNumberValidation().validateNumber({ validationNumber })
    const data = await __Kyc.findOne({ validationNumber })

    if (!data) throw new ErrorHandler().UserInputError('Invalid BVN provided')
    return data
  }

  async verifyPassport(validationNumber: string): Promise<any> {
    await new ValNumberValidation().validateNumber({ validationNumber })
    const data = await __Kyc.findOne({ validationNumber })
    if (!data) throw new ErrorHandler().UserInputError('Invalid data provided')
    return data
  }

  async verifyDrivingLincence(validationNumber: string): Promise<any> {
    await new ValNumberValidation().validateNumber({ validationNumber })
    const data = await __Kyc.findOne({ validationNumber })
    if (!data) throw new ErrorHandler().UserInputError('Invalid driving lincence provided')
    return data
  }

  async createKyc(data: any): Promise<any> {
    return await __Kyc.create(data)
  }

}



export default LevelsDatasource
