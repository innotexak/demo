import { gql } from 'graphql-tag'

const ServiceProviderType = gql`
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
    text input
  }

  input FieldInput {
    inputType: FieldType!
    title: String!
  }

  input IserviceProvider {
    service: String!
    disabled: Boolean!
    fields: [FieldInput!]!
  }

  type Query {
    # Define your query types here
    getServiceProviders: [ServiceProvider!]!
    getServiceProvider(_id: ID!): ServiceProvider!
  }

  type Mutation {
    addServiceProvider(
      service: String
      disabled: Boolean
      fields: [FieldInput]
    ): Boolean
    deleteServiceProvider(_id: String!): Boolean!
    enableServiceProvider(_id: String!): Boolean!
    disableServiceProvider(_id: String!): Boolean!
  }
`

export default ServiceProviderType
