import { KycQuery, KycMutation } from './services/kyc/resolver.js'
import {
  ServiceProviderQuery,
  ServiceProviderMutation,
} from './services/service-provider/resolver.js'
import { LevelsQuery, LevelsMutation } from './services/levels/resolver.js'
import { MerchantMutation, MerchantQuery } from './services/merchant/resolver.js'
const Mutation = {
  ...KycMutation,
  ...ServiceProviderMutation,
  ...LevelsMutation,
  ...MerchantMutation
}
const Query = {
  ...KycQuery,
  ...ServiceProviderQuery,
  ...LevelsQuery,
  ...MerchantQuery
}

export { Mutation, Query }
