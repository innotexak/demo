import { gql } from "graphql-tag";

const KycType = gql`

 type Query {
    getKycs: [Ikyc!]!
    
  }
type Mutation {
  InitTransaction(userRef:String! merchantId:ID!):String!
  InitializeVerification(userRef:String! merchantId:ID!):JSON!
  verifyNIN(validationNumber:String!): Ikyc
  verifyBVN(validationNumber:String!): Ikyc
  verifyPassport(validationNumber:String!): Ikyc
  verifyDrivingLincence(validationNumber:String!): Ikyc
  createKyc(values:KycInputInterface!):String!
}


enum GenderEnum{
  male
  female
}

enum KycEnum{
  bvn
  nin
  passport
  drivingLicence
}

type Ikyc {
  merchantId: ID!
  userRef:String
  validationNumber: String
  firstName: String
  lastName: String
  phoneNumber: String
  dateOfBirth: DateTime
  status: String
  gender: GenderEnum
  kycType:KycEnum
}

input KycInputInterface{  
  merchantId: ID!
  userRef:String!
  validationNumber: String
  firstName: String
  lastName: String
  phoneNumber: String
  dateOfBirth: DateTime
  status: String
  gender: GenderEnum
  kycType:KycEnum
}
`;

export default KycType;
