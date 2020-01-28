const graphql = require('graphql');
const joinMonster = require('join-monster');
const client = require('../config.js');

// alternative to dataLoader, translates users graphql queries to sql statements
const Products = new graphql.GraphQLObjectType({
  name: 'Products',
  fields: () => ({
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    barcode: { type: graphql.GraphQLString },
    nutrition: { type: graphql.GraphQLString }
  })
});

Products._typeConfig = {
  sqlTable: 'products',
  uniqueKey: 'id',
};

// schema/resolvers
const QueryRoot = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    products: {
      type: new graphql.GraphQLList(Products),
      // id: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
      // where: (products, args, context) => `${products}.id = '${args.id}'`,
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return client.query(sql);
        })
      }
    },
    id: {
      type: Products,
      args: {
        arg: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
      },
      where: (products, args, context) => `${products}.id = '${args.arg}'`,
      resolve: (parent, args, context, resolveInfo) => {
        // console.log('context', context);
        return joinMonster.default(resolveInfo, {}, sql => {
          console.log('sql', sql);
          return client.query(sql);
        })
      }
    },
    name: {
      type: Products,
      args: {
        arg: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
      },
      where: (products, args, context) => `${products}.name = '${args.arg}'`,
      resolve: (parent, args, context, resolveInfo) => {
        // console.log('context', context);
        return joinMonster.default(resolveInfo, {}, sql => {
          console.log('sql', sql);
          return client.query(sql);
        })
      }
    },
    barcode: {
      type: Products,
      args: {
        arg: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
      },
      where: (products, args, context) => `${products}.barcode = '${args.arg}'`,
      resolve: (parent, args, context, resolveInfo) => {
        // console.log('context', context);
        return joinMonster.default(resolveInfo, {}, sql => {
          console.log('sql', sql);
          return client.query(sql);
        })
      }
    },
    nutrition: {
      type: Products,
      args: {
        arg: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
      },
      where: (products, args, context) => `${products}.nutrition = '${args.arg}'`,
      resolve: (parent, args, context, resolveInfo) => {
        // console.log('context', context);
        return joinMonster.default(resolveInfo, {}, sql => {
          console.log('sql', sql);
          return client.query(sql);
        })
      }
    },
    // ...
  })
});

const schema = new graphql.GraphQLSchema({ query: QueryRoot });

module.exports = schema;
