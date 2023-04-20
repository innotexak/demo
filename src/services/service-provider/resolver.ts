import { IserviceProviders } from '../../models/serviceProviders.js'
import ServiceProviderDatasource from './datasource.js'

export const ServiceProviderMutation = {
  async addServiceProvider(__,iserviceProviders: IserviceProviders,
  ): Promise<any> {
    return await new ServiceProviderDatasource().addServiceProvider(iserviceProviders)
  },
  async deleteServiceProvider(__, _id: string): Promise<boolean> {
    return await new ServiceProviderDatasource().deleteServiceProvider(_id)
  },
  async enableServiceProvider(__, _id: string): Promise<boolean> {
    return await new ServiceProviderDatasource().enableServiceProvider(_id)
  },
  async disableServiceProvider(__, _id: string): Promise<boolean> {
    return await new ServiceProviderDatasource().disableServiceProvider(_id)
  },
}

export const ServiceProviderQuery = {
  async getServiceProviders(): Promise<IserviceProviders[]> {
    return await new ServiceProviderDatasource().getServiceProviders()
  },
  async getServiceProvider(__, _id: string): Promise<IserviceProviders> {
    return await new ServiceProviderDatasource().getServiceProvider(_id)
  },
}
