import { IKYCLevel } from '../../models/levels.js'
import { ILevelValidation } from '../../validation/validation.js'
import LevelsDatasource from './datasource.js'
import { ISessionUpdate, ISessionsInterface } from './type.js'

export const LevelsMutation = {
  async addKycLevel(__, { userId, processToken }: { userId: string, processToken: string }): Promise<String> {
    return await new LevelsDatasource().addKycLevel(userId, processToken)
  },

  async deleteKycLevel(__, _id: string): Promise<String> {
    return await new LevelsDatasource().deleteKycLevel(_id)
  },

  async updateKycLevel(__, iKycLevel: { levelId: string, levelName: string, providers: string[] }): Promise<String> {
    const { levelId, levelName, providers } = iKycLevel

    return await new LevelsDatasource().updateKycLevel(levelId, { levelName, providers })
  },

  async addingArrayOfLevels(__: unknown, { userId, levels }: { userId: string, levels: [object] }): Promise<String> {

    return await new LevelsDatasource().addingArrayOfLevels(userId, levels)
  },

  async createSessionsLevels(__: unknown, { numLevels, merchantId }: { numLevels: number, merchantId: string }): Promise<ISessionsInterface> {

    return await new LevelsDatasource().createLevelsSessions(numLevels, merchantId)
  },

  async updateSessonsLevels(__: unknown, { levelName, processToken, providers }: ISessionUpdate): Promise<String> {
    return await new LevelsDatasource().updateSessionsLevels(processToken, levelName, providers)
  }


}

export const LevelsQuery = {
  async getKycLevels(): Promise<any> {

    return await new LevelsDatasource().getKycLevels()
  },

  async getKycLevel(__, _id: string): Promise<any> {
    return await new LevelsDatasource().getKycLevel(_id)
  },
}
