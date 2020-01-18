// todo, add barcode to query?
const typeDefs = `
  type Product {
    id: ID!
    name: String!
    barcode: String!
    nutrition: String
  }

  extend type Query {
    products: [Product!]
    product(id: ID!): Product!
  }
  
  extend type Mutation {
    createNewProduct(name: String!, barcode: String!): Product!
    deleteProduct(id: ID!): Boolean!
    updateProduct(id: ID!, name: String!): Product!
  }
`;

module.exports = typeDefs;


const Product = new graphql.GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    barcode: { type: graphql.GraphQLString },
    nutrition: { type: graphql.GraphQLString }
  })
});

Product._typeConfig = {
  sqlTable: 'products',
  uniqueKey: 'id',
}
