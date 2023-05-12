import { Types } from 'mongoose'
import Base from '../../Base.js'
import { ErrorHandler } from '../../helpers/ErrorHandler.js'
import __Kyc from '../../models/Kyc.js'
import __level from '../../models/levels.js'
import __merchant from '../../models/merchant.js'
import __transaction from '../../models/transaction.js'
import { BvnValidation, DrivingLicenceValidation, KycsValidation, NinValidation, PassportValidation } from '../../validation/validation.js'
import { ICreateKyc } from './interfaces.js'
import crypto from 'crypto'

class LevelsDatasource extends Base {
  async verifyNIN(validationNumber: string): Promise<any> {
    // await this.InitPaymentTransanction(merchantId, '25')
    await new NinValidation().validateNin({ validationNumber })
    const data = await __Kyc.findOne({
      $and: [{ validationNumber }, { kycType: 'nin' }]
    })
    if (!data) throw new ErrorHandler().ValidationError('NIN verification failed')
    return data
  }

  async verifyBVN(validationNumber: string): Promise<any> {
    await new BvnValidation().validateBvn({ validationNumber })
    const data = await __Kyc.findOne({
      $and: [{ validationNumber }, { kycType: 'bvn' }]
    })
    if (!data) throw new ErrorHandler().ValidationError('BVN verification failed')
    return data
  }

  async verifyPassport(validationNumber: string): Promise<any> {
    await new PassportValidation().validatePassport({ validationNumber })
    const data = await __Kyc.findOne({
      $and: [{ validationNumber }, { kycType: 'passport' }]
    })
    if (!data) throw new ErrorHandler().ValidationError('Passport verification failed')
    return data
  }

  async verifyDrivingLincence(validationNumber: string): Promise<any> {
    await new DrivingLicenceValidation().validateDrivingLicence({ validationNumber })
    const data = await __Kyc.findOne({
      $and: [{ validationNumber }, { kycType: 'drivingLicence' }]
    })
    if (!data) throw new ErrorHandler().ValidationError('Driving License verification failed')
    return data
  }

  async createKyc(data: ICreateKyc): Promise<String> {
    await new KycsValidation().createKyc(data)
    const created = await __Kyc.create(data)
    if (created) return "KYC created successfully"
  }


  async InitTransaction(userRef: string, merchantId: string): Promise<String> {
    const userData = await __Kyc.find({ userRef });
    const pipeline = [
      {
        $match: { userId: new Types.ObjectId(merchantId) },
      },
      {
        $lookup: {
          from: "service_providers",
          localField: "providers",
          foreignField: "_id",
          as: "providers",
        },
      },
    ];

    const levels = await __level.aggregate(pipeline);
    if (userData.length > 0 && userData[0].status === 'verified') return "User already verified"
    if (!levels.length) throw new ErrorHandler().NotFoundError('Unable to initialize the verification process')

    const payload = {
      userRef,
      usedFor: 'verification',
      processToken: `NA_SE-${crypto.randomBytes(16).toString('hex')}-END`,
      verified: true,
      authorized: true,
      transactionValidityExpires: new Date(Date.now() + 60 * 1000)
    }

    const init = await __transaction.create(payload)
    if (init) return init.processToken

  }

  async InitializeVerification(userRef: string, merchantId: string): Promise<any> {
    const pipeline = [
      {
        $match: { userId: new Types.ObjectId(merchantId) },
      },
      {
        $lookup: {
          from: "service_providers",
          localField: "providers",
          foreignField: "_id",
          as: "providers",
        },
      },
    ];

    const levels = await __level.aggregate(pipeline);
    const userData = await __Kyc.find({ userRef });
    if (userData.length > 0) {

      // Check if user is already verified
      const verifiedUser = userData.find((user) => user.status === "verified");
      if (verifiedUser) {
        return { message: "User is already verified" };
      }
    }

    let unfinishedLevels = [];
    for (let level of levels) {
      const providers = level.providers;
      let isLevelComplete = true;
      for (let provider of providers) {
        const providerType = provider.fields;
        const requiredKycType = providerType[0].title;
        const userKyc = userData.find((user) => user.kycType === requiredKycType);
        if (!userKyc || userKyc.status !== "verified") {
          isLevelComplete = false;
          break;
        }
      }
      if (!isLevelComplete) {
        unfinishedLevels.push(level);
      }
    }

    return unfinishedLevels;
  }

}

export default LevelsDatasource
