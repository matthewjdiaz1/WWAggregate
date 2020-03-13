const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphiqlExpress, graphqlExpress } = require('graphql-server-express');
const { ApolloServer, gql } = require('apollo-server');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const PORT = process.env.PORT || 4000;
const schema = require('./schema');
const client = require('./config.js');
const ip = require('ip');
const db = require('./db');

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.get('Authorization');
//   if (!authHeader) {
//     req.isAuth = false;
//     return next();
//   }
//   const token = authHeader.split(' ')[1];
//   if (!token || token === '') {
//     req.isAuth = false;
//     return next();
//   }
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, 'testSecret')
//   } catch (err) {
//     console.log('middleware error server/index.js ln 32');
//     req.isAuth = false;
//     return next();
//   }
//   if (!decodedToken) {
//     req.isAuth = false;
//     return next();
//   }
//   req.isAuth = true;
//   req.userId = decodedToken.userId;
//   next();
// }
// app.use(authMiddleware);

const app = express();
app.use(bodyParser.json());

// authentication middleware
app.use((req, res, next) => {
  // console.log('\nreq.headers:', req.headers);
  // req.headers.userId = 'test'; // fetch the user making the request if desired
  // req.headers.jwt = null;
  res.set('userId', 'userid 13432343');
  res.set('jwt', 'JWT 7656787654567654567');
  // console.log('\nreq.headers:', res);
  next();
});

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);
app.use('/graphql', graphqlExpress(req => ({
  schema,
  context: {
    userId: req.userId,
    jwt: req.jwt,
  },
})));

app.listen(PORT, () => console.log(`Server started on port ${PORT}.\nYour IP: ${ip.address()}.`));

client.connect();
