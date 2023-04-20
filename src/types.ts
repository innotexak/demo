import gql from 'graphql-tag'
import { typeDefs as scalarTypeDefs } from 'graphql-scalars'
import KycSchema from './services/kyc/typeDefs.js'
import ServiceProviderSchema from './services/service-provider/typeDefs.js'
import KycLevelSchema from './services/levels/typeDefs.js'
import MerchantSchema from './services/merchant/typeDefs.js'
const rootTypeDefs = gql`
  enum gender {
    male
    female
  }

  type Mutation {
    _: Boolean
  }

  type Query {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`
export default [
  rootTypeDefs,
  KycSchema,
  ServiceProviderSchema,
  KycLevelSchema,
  MerchantSchema,
  ...scalarTypeDefs,
]
