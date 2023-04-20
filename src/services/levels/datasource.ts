import { Types } from 'mongoose'
import Base from '../../Base.js'

import { ErrorHandler } from '../../helpers/ErrorHandler.js'

import __KYCLevel, { IKYCLevel } from '../../models/levels.js'
import { ILevelValidation, LevelsValidation } from '../../validation/validation.js'


class LevelsDatasource extends Base {

  //Get all kyc levels
  async getKycLevels(): Promise<IKYCLevel[]> { return (await __KYCLevel.find({})) }

  //Get single kyc level by id
  async getKycLevel(_id: string): Promise<IKYCLevel> {
    const kycLevel = await __KYCLevel.findById(_id)
    if (!kycLevel) throw new ErrorHandler().NotFoundError('KYC level not found')
    return kycLevel
  }

  // Method for adding a new kyc  level
  async addKycLevel(kycLevel: ILevelValidation): Promise<String> {
    await new LevelsValidation().createLevel(kycLevel)
    const newKYCLevel = await __KYCLevel.create(kycLevel)
    if (newKYCLevel) return 'KYC level created successfully';
  }

  // Method for deleting a kyc level by kyc id
  async deleteKycLevel(_id: string): Promise<String> {
    const result = await __KYCLevel.findByIdAndDelete(_id)
    if (result) return 'KYC level successfully deleted'
    return "Cannot delete KYC level"
  }

  // Method for updating  kycs levels
  async updateKycLevel(_id: string, iKYCLevel: { levelName: string, providers: string[] }): Promise<String> {
    const levelId = new Types.ObjectId(_id)
    const { providers, levelName } = iKYCLevel
    const docs = await __KYCLevel.findOne({ _id: levelId })
    for (let _id of providers) {
      if (!docs.providers.includes(_id as any)) docs.providers.push(_id as any)
    }

    const updated = await __KYCLevel.updateOne({ _id: _id }, { $set: { levelName, providers: docs.providers } },);

    if (updated.matchedCount === 0) throw new ErrorHandler().UserInputError('Invalid level id')

    return 'Level updated successfully'


  }


}

// Export the LevelsDatasource class
export default LevelsDatasource
