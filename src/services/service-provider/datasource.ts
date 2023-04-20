// Import the Base class from a file located at "../../Base.js"
import Base from '../../Base.js'

// Import the __ServiceProviders and IserviceProviders from a file located at "../../models/serviceProviders.js"
import __ServiceProviders, {
  IserviceProviders,
} from '../../models/serviceProviders.js'

// Import the error handling classes from "../../helpers/ErrorHandler.js"
import { ErrorHandler } from '../../helpers/ErrorHandler.js'
import { IServiceValidation, ServicesValidation } from '../../validation/validation.js'

// Define the ServiceProviderDatasource class that extends the Base class
class ServiceProviderDatasource extends Base {
  // Method for getting all service providers
  async getServiceProviders(): Promise<IserviceProviders[]> {
    // Find all service providers and return them
    return await __ServiceProviders.find()
  }

  // Method for getting a service provider by service name
  async getServiceProvider(_id: string): Promise<IserviceProviders> {
    // Find the specified service provider and return it
    const serviceProvider = await __ServiceProviders.findById(_id)

    if (!serviceProvider)
      throw new ErrorHandler().NotFoundError('Service provider not found')

    return serviceProvider
  }

  // Method for adding a new service provider
  async addServiceProvider(iserviceProviders: IServiceValidation): Promise<any> {
    // Create a new service provider and handle any errors that occur
await new ServicesValidation().createService(iserviceProviders)
    const newServiceProvider = await __ServiceProviders.create(
      iserviceProviders,
    )

    if (!newServiceProvider)
      throw new ErrorHandler().UserInputError('All fields should be unique')
    // Return the newly created service provider
    return true
  }

  // Method for deleting a service provider by service name
  async deleteServiceProvider(_id: string): Promise<boolean> {
    // Delete the service provider and return whether or not it was successfully deleted
    const result = await __ServiceProviders.findByIdAndDelete(_id)

    if (result) return true

    return false
  }

  // Method for enabling a service provider by updating its disabled field to false
  async enableServiceProvider(_id: string): Promise<boolean> {
    // Find and update the specified service provider and handle any errors that occur
    const updatedServiceProvider = await __ServiceProviders.findByIdAndUpdate(
      _id,
      { disabled: false },
      { new: true },
    )

    if (!updatedServiceProvider)
      throw new ErrorHandler().NotFoundError(`Service Provider  not found`)

    // Return the updated service provider
    return true
  }
  // Method for updating a service provider's disabled field to true
  async disableServiceProvider(_id: string): Promise<boolean> {
    // Find and update the specified service provider and handle any errors that occur
    const updatedServiceProvider = await __ServiceProviders.findByIdAndUpdate(
      _id,
      { disabled: true },
      { new: true },
    )

    if (!updatedServiceProvider)
      throw new ErrorHandler().ForbiddenError('You can not update this')
    // Return the updated service provider
    return true
  }
}

// Export the ServiceProviderDatasource class
export default ServiceProviderDatasource
