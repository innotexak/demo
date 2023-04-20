import { gql } from "graphql-tag";

const KycType = gql`

input UserInput {
  kycId: String!
  kycType: String!
  secretKey: String!
}

type Kyc{
  kycId: String!
  kycType: String!
  secretKey: String!
}

 type Query {
    getKycs: [Kyc!]!
    
  }
type Mutation {
  verifyNIN(validationNumber:String!): JSON
  verifyBVN(validationNumber:String!): JSON
  verifyPassport(validationNumber:String!): JSON
  verifyDrivingLincence(validationNumber:String!): JSON
  createKyc(validationNumber:String kycType:String):JSON
}
`;

export default KycType;
