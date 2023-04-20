import { IKYCLevel } from '../../models/levels.js'
import { ILevelValidation } from '../../validation/validation.js'
import LevelsDatasource from './datasource.js'

export const LevelsMutation = {
  async addKycLevel(__, iKycLevel: ILevelValidation): Promise<String> {
    return await new LevelsDatasource().addKycLevel(iKycLevel)
  },

  async deleteKycLevel(__, _id: string): Promise<String> {
    return await new LevelsDatasource().deleteKycLevel(_id)
  },

  async updateKycLevel(__, iKycLevel: { levelId: string, levelName: string, providers: string[] }): Promise<String> {
    const { levelId, levelName, providers } = iKycLevel

    return await new LevelsDatasource().updateKycLevel(levelId, { levelName, providers })
  }

}

export const LevelsQuery = {
  async getKycLevels(): Promise<IKYCLevel[]> {

    return await new LevelsDatasource().getKycLevels()
  },

  async getKycLevel(__, _id: string): Promise<IKYCLevel> {
    return await new LevelsDatasource().getKycLevel(_id)
  },
}
