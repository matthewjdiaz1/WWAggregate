const express = require('express');
// const { graphqlExpress } = require('graphql-server-express');
const { ApolloServer, graphqlExpress } = require('apollo-server-express');
// const jwt = require('jsonwebtoken');
const jwt = require('express-jwt');
const ip = require('ip');
// const { json } = require('body-parser');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 4000;
const JWT_SECRET = 'superDuperTopSecret'; // TODO - add to config to prevent github push
const schema = require('./schema');
const { client } = require('./config');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    console.log('server req.user:', req.user);
    return {
      user: req.user,
    }
  },
  // context: (() => ({
  //   user: { id: 420, email: '' } // dev context
  // })),
});

const auth = jwt({ secret: JWT_SECRET, credentialsRequired: false });
app.use(auth);
// client.connect(); // TODO - investigate wtf this is for
server.applyMiddleware({ app });

app.listen(PORT, () => console.log(`
------------------------------------------------ Server started on port ${PORT} -------------------------------------------------

-------------------------------------------------- Your IP: ${ip.address()}. ----------------------------------------------------

`));
