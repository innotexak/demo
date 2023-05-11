import { Types } from 'mongoose'
import Base from '../../Base.js'
import crypto from 'crypto'
import { ErrorHandler } from '../../helpers/ErrorHandler.js'
import __KYCLevel from '../../models/levels.js'
import { ILevelValidation, LevelsValidation } from '../../validation/validation.js'
import { ISession, ISessionsInterface } from './type.js'
import __Session from '../../models/levelSessionSchema.js'
import __Merchant from '../../models/merchant.js'


class LevelsDatasource extends Base {

  //Get all kyc levels
  async getKycLevels(merchantId: string): Promise<any> {
    const kycLevels = await __KYCLevel.aggregate([
      {
        $match: { merchantId: new Types.ObjectId(merchantId) },
      },
      {
        $lookup: {
          from: "service_providers",
          localField: "providers",
          foreignField: "_id",
          as: "providers",
        },
      },
    ]).exec();

    if (kycLevels.length === null || kycLevels.length === undefined) throw new ErrorHandler().NotFoundError('Record not found')
    return kycLevels
  }

  //Get single kyc level by id
  async getKycLevel(_id: string): Promise<any> {
    const kycLevel = await __KYCLevel.aggregate([
      {
        $lookup: {
          from: "service_providers",
          localField: "providers",
          foreignField: "_id",
          as: "providers"
        }
      },
    ])
    if (kycLevel.length === null || kycLevel.length === undefined) throw new ErrorHandler().NotFoundError('KYC level not found')
    return kycLevel
  }

  // Method for adding a new kyc  level
  async addKycLevel(processToken: string): Promise<String> {
    const sessionData = await __Session.find({ processToken })
    if (!sessionData.length) throw new ErrorHandler().ValidationError("Invalid session")
    const data = sessionData.map((item) => {
      return { providers: item.providers, levelName: item.levelName, userId: item.userId }
    })
    const newKYCLevel = await __KYCLevel.insertMany(data)
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

    const updated = await __KYCLevel.updateOne({ _id }, { $set: { levelName, providers: docs.providers } },);

    if (updated.matchedCount === 0) throw new ErrorHandler().UserInputError('Invalid level id')

    return 'Level updated successfully'


  }

  async addingArrayOfLevels(userId: string, levels: [object]) {

    const arrayOfLevels = []
    levels.forEach(async (level) => {
      const singleLevel: ILevelValidation = { ...level, userId }

      arrayOfLevels.push(singleLevel)
      await new LevelsValidation().createLevel(singleLevel)
    })

    const newKYCLevels = await __KYCLevel.insertMany(arrayOfLevels)

    if (newKYCLevels) return 'KYC levels created successfully';


  }

  // Session based flow for kyc's level configuration 
  async createLevelsSessions(numLevels: number, userId: string): Promise<ISessionsInterface> {
    const isUser = await __KYCLevel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: "merchants",
          localField: "userId",
          foreignField: "_id",
          as: "merchant"
        }
      },
    ])


    if (isUser.length) throw new ErrorHandler().UserInputError('KYC level configuration already exist')
    const isSession = await __Session.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: "merchants",
          localField: "userId",
          foreignField: "_id",
          as: "merchant"
        }
      },
    ])

    if (isSession.length) throw new ErrorHandler().ForbiddenError('You already have an existing session')
    let levels: ISession[] = []; // Initialize the levels array
    const processToken = `NA_SE-${crypto.randomBytes(16).toString('hex')}-END`;
    if (numLevels <= 0) throw new ErrorHandler().UserInputError('Invalid input');

    if (numLevels === 1) {
      return { levels: [{ label: 'level 1', value: 'level 1' }], processToken };
    } else {
      for (let i = 1; i <= numLevels; i++) {
        levels.push({ label: `Level ${i}`, value: `level ${i}` })
      }

      const saveMany = await levels.map(async (level) => {
        return await __Session.create({ levelName: level.label, providers: [], processToken, userId })
      });
      ;

      if (saveMany) return { levels, processToken };
    }
  }

  // Updating session based flow for kyc's level configuration
  async updateSessionsLevels(processToken: string, levelName: string, providers: string[]): Promise<String> {

    const configLevels = await __Session.findOne({ processToken })
    if (!configLevels) throw new ErrorHandler().ValidationError('Invalid or expired session, try again')
    // levelName.charAt(0).toUpperCase()
    const mylevel = await __Session.findOne({ levelName })
    if (!mylevel) throw new ErrorHandler().ValidationError('Invalid session credentials')
    for (let _id of providers) {
      if (!mylevel.providers.includes(_id as any)) mylevel.providers.push(_id as any)
    }
    const updated = await __Session.updateOne({ levelName: levelName }, { $set: { providers: mylevel.providers } },);
    if (updated.matchedCount > 0) return "Saved, please proceed";
  }

  // delete session
  async deleteSessionsLevel(processToken: string, levelName: string): Promise<String> {

    const configLevels = await __Session.findOne({ processToken })
    if (!configLevels) throw new ErrorHandler().ValidationError('Invalid or expired session, try again')
    const mylevel = await __Session.findOne({ levelName })
    if (!mylevel) throw new ErrorHandler().ValidationError('Invalid session credentials')
    const updated = await __Session.updateOne({ levelName: levelName }, { $set: { providers: [] } },);

    if (updated.matchedCount > 0) return "Level deleted";
  }

  // upload saved temporary session
  async uploadSavedTempSession(processToken: string) {
    const mySession = await __Session.find({ processToken })
    if (!mySession.length) throw new ErrorHandler().ValidationError("Invalid or expired session credentials, try again")
    const formattedSession = mySession.map((level) => {
      const userId = level.userId.toString()
      if (!level.providers.length) throw new ErrorHandler().UserInputError(`Please selet at least one provider for ${level.levelName}`)
      const providers = level.providers.map(item => item.toString())

      return {
        levelName: level.levelName,
        userId: userId,
        providers
      }
    })

    const result = await Promise.all(
      formattedSession.map(async (item) => {
        return await __KYCLevel.create(item);
      })
    );

    if (result.length) {
      await __Session.deleteMany({ processToken })
      return result
    }

  }

  // get current session
  async getCurrentSession(processToken: string): Promise<any> {
    const isSession = await __Session.find({ processToken })
    if (!isSession.length) throw new ErrorHandler().AuthenticationError('Invalid session credential')
    return isSession
  }

  // clear current session
  async clearUserSessions(processToken: string) {
    const findAll = await __Session.find({ processToken })
    const deleted = await __Session.deleteMany({ processToken })
    if (deleted.deletedCount === findAll.length) return "Session data cleared successfully"
  }

}



export default LevelsDatasource
