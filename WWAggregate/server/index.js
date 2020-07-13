const express = require('express');
// const { graphqlExpress } = require('graphql-server-express');
const { ApolloServer, graphqlExpress } = require('apollo-server-express');
// const jwt = require('jsonwebtoken');
const jwt = require('express-jwt');
const ip = require('ip');

const PORT = process.env.PORT || 4000;
const JWT_SECRET = 'superDuperTopSecret'; // TODO - add to config to prevent github push
const schema = require('./schema');
const { client } = require('./config');
const db = require('./db');

const app = express();

const authMiddleware = jwt({ secret: JWT_SECRET, credentialsRequired: false });
app.use(authMiddleware);

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const { user, headers } = req;
    // console.log('server user:', user);
    // console.log('server headers.authorization:', headers.authorization);
    return {
      user: req.user,
    }
  },
  // dev context
  // context: {
  //   user: {
  //     id: 420,
  //     email: '',
  //   }
  // },
});

// client.connect(); // TODO - investigate purpose
server.applyMiddleware({ app });

app.listen(PORT, () => console.log(`\n----------------------- GraphQL Playground at ${ip.address()}:${PORT}/graphql ------------------------\n`));
