import { gql } from "graphql-tag";

const MerchantType = gql`
 type Query {
    getMerchants:JSON
    getMerchantById(merchantId:String!):JSON
    
  }
type Mutation {
  createMerchant( merchantId:String firstName:String lastName:String ): JSON

}


`;

export default MerchantType;
