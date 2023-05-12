import LevelsDatasource from './datasource.js'
import { ISessionUpdate, ISessionsInterface } from './type.js'

export const LevelsMutation = {
  async addKycLevel(__: unknown, { processToken }: { processToken: string }): Promise<String> {
    return await new LevelsDatasource().addKycLevel(processToken)
  },

  async deleteKycLevel(__: unknown, _id: string): Promise<String> {
    return await new LevelsDatasource().deleteKycLevel(_id)
  },

  async updateKycLevel(__: unknown, iKycLevel: { levelId: string, levelName: string, providers: string[] }): Promise<String> {
    const { levelId, levelName, providers } = iKycLevel
    return await new LevelsDatasource().updateKycLevel(levelId, { levelName, providers })
  },

  async addingArrayOfLevels(__: unknown, { userId, levels }: { userId: string, levels: [object] }): Promise<String> {
    return await new LevelsDatasource().addingArrayOfLevels(userId, levels)
  },

  async createSessionsLevels(__: unknown, { numLevels, merchantId }: { numLevels: number, merchantId: string }): Promise<ISessionsInterface> {
    return await new LevelsDatasource().createLevelsSessions(numLevels, merchantId)
  },

  async updateSessonsLevels(__: unknown, { processToken, levelName, providers }: ISessionUpdate): Promise<String> {
    return await new LevelsDatasource().updateSessionsLevels(processToken, levelName, providers)
  },

  async clearUserSessions(__: unknown, { processToken }: { processToken: string }): Promise<boolean> {
    return await new LevelsDatasource().clearUserSessions(processToken)
  },

  async uploadSavedTempSession(__: unknown, { processToken }: { processToken: string }) {
    return await new LevelsDatasource().uploadSavedTempSession(processToken)
  },

  async deleteSessionsLevel(__: unknown, { processToken, levelName }: { processToken: string, levelName: string }) {
    return await new LevelsDatasource().deleteSessionsLevel(processToken, levelName)
  }

}

export const LevelsQuery = {
  async getKycLevels(__: unknown, { userId }: { userId: string }): Promise<any> {
    return await new LevelsDatasource().getKycLevels(userId)
  },

  async getKycLevel(__: unknown, _id: string): Promise<any> {
    return await new LevelsDatasource().getKycLevel(_id)
  },
  async getCurrentSession(___: unknown, { processToken }: { processToken: string }) {
    return await new LevelsDatasource().getCurrentSession(processToken)
  }
}


