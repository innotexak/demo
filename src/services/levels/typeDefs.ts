import { gql } from 'graphql-tag'

const KycLevelType = gql`

  type Query {
    getKycLevels(userId:String!): [IKycLevel!]!
    
    getKycLevel(_id: ID!): IKycLevel!
    getCurrentSession(processToken:String!):[TemptSession!]!
  }

  type Mutation {
    addKycLevel(processToken:String): String!
    deleteKycLevel(_id: ID!): String!
    updateKycLevel(levelId:String! levelName:String! providers:[String!]!): String!
    addingArrayOfLevels(userId:ID, levels:[ArrayOfLevels!]!):String!
    createSessionsLevels(numLevels:Int merchantId:String):SessionInterface
    updateSessonsLevels(
      processToken:String!
      levelName:String!
      providers:[String!]!): String!
    uploadSavedTempSession(processToken:String!):[IKycLevel]!
    clearUserSessions(processToken:String!):Boolean!
    deleteSessionsLevel(processToken:String! levelName:String!): String!
  
  }

    input ArrayOfLevels {
    levelName:String! 
    providers:[String!]!
  }

  type ISession{
    label:String
    value:String
  }

  type SessionInterface{
    processToken:String
    levels:[ISession]
  }

  type TemptSession{
    userId:ID!
    levelName:String!
    providers:[String]!
    processToken:String!
    createdAt:DateTime!
  }
    type IKycLevel{
    _id:ID!
    userId:ID!
    levelName:String!
    providers:[ServiceProvider]
    updatedAt:DateTime!
    createdAt:DateTime!
  }

    type Field {
    inputType: String
    title: String
  }


  type ServiceProvider {
    _id: ID
    service: String
    disabled: Boolean
    fields: [Field]
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
`

export default KycLevelType
