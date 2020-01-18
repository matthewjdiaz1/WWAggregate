const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const { Client } = require('pg');
const joinMonster = require('join-monster');
const config = require('./config.js');

const PORT = 4000;

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

const QueryRoot = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => "Hello world!"
    },
    test: {
      type: graphql.GraphQLInt,
      desctiption: "lucky number",
      resolve: () => {
        return 99;
      }
    },
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
})

const schema = new graphql.GraphQLSchema({ query: QueryRoot });

const app = express();
app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
});

const client = new Client(config);
client.connect();
