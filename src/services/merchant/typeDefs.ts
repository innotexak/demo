import { gql } from "graphql-tag";

const MerchantType = gql`
 type Query {
    getMerchantKyc:JSON
    
  }
type Mutation {
  createMerchant( firstName:String lastName:String ): JSON

}


`;

export default MerchantType;
