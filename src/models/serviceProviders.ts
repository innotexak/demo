import { Schema, Document, model } from 'mongoose'
import { ErrorHandler } from '../helpers/ErrorHandler.js'

// Define the fields of your schema

interface IFields extends Document {
  inputType: string
  title: string
}

export interface IserviceProviders extends Document {
  service: string
  disabled: boolean
  fields: Array<IFields>
}

enum fieldTypes {
  file = 'file',
  input = 'textInput',
}

export const fields: Schema = new Schema<IFields>({
  inputType: {
    type: String,
    enum: Object.keys(fieldTypes),
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

// Define your schema
const serviceProvidersSchema: Schema = new Schema<IserviceProviders>({
  disabled: {
    type: Boolean,
    required: true,
    default: false,
  },
  service: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fields: [fields],
})



// Create and export the mongoose model
// export const service_providersModel = mongoose.model<Iservice_providers>("service_providers", service_providersSchema);

export default model<IserviceProviders>(
  'service_providers',
  serviceProvidersSchema,
)




