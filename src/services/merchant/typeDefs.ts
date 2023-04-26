import { gql } from "graphql-tag";

const MerchantType = gql`
 type Query {
    getMerchants:[IMerchant!]!
    getMerchantById(merchantId:String!):IMerchant
    
  }
type Mutation {
  createMerchant( merchantId:String firstName:String lastName:String ): String
}

type IMerchant {
      _id:ID!
      merchantId:String!
      firstName:String!
      lastName: String!
      ballance: String!
      status: String!
      disabled: String!
      publicKey: String!
      secretKey: String!
      testPublicKey: String!
      testSecretKey: String!
      createdAt: DateTime!
      updatedAt: DateTime!
}
`;

export default MerchantType;
