import { gql } from 'graphql-tag'

const KycLevelType = gql`
  type Field {
    inputType: String
    title: String
  }

  enum FieldType {
    file
    textInput
  }

  type provider {
    id:ObjectID!
  }

  input providerInput{
    id:ObjectID
  }

  type kyc{
    levelName:String!
    providers:[provider!]!
  }

  input KycInput {
    levelName:String!
    providers:[providerInput]

  }

    input updateInput {
    _id:String!
    levelName:String!
    providers:[providerInput]

  }

  type KYCLevel{
    _id:ID!
  levels:[kyc!]!
  }

  type Query {
    getKycLevels: [IKycLevel!]!
    getKycLevel(_id: ID!): IKycLevel!
  }

  type Mutation {
    addKycLevel(userId: ID!, levelName:String!, providers:[String!]!): String!
    deleteKycLevel(_id: ID!): String!
    updateKycLevel(levelId:String!, levelName:String!, providers:[String!]!): String!
    addingArrayOfLevels(userId:ID, levels:[ArrayOfLevels!]!):String
  }

    input ArrayOfLevels {
    levelName:String!
    providers:[String!]!
  }

    type IKycLevel{
    _id:ID!
    userId:ID!
    levelName:String!
    providers:[ID!]!
    updatedAt:DateTime!
    createdAt:DateTime!
  }
`

export default KycLevelType
