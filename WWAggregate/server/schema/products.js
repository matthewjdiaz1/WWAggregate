const graphql = require('graphql');
const joinMonster = require('join-monster');
const client = require('../config.js');

const QueryRoot = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    products: {
      type: new graphql.GraphQLList(Product),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return client.query(sql)
        })
      }
    },
    product: {
      type: Product,
      args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
      where: (products, args, context) => `${products}.id = ${args.id}`,
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfok, {}, sql => {
          return client.query(sql)
        })
      }
    }
    // ...
  })
});

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
};

const schema = new graphql.GraphQLSchema({ query: QueryRoot });

module.exports = schema;
