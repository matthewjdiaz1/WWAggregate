const express = require('express');
const graphqlHTTP = require('express-graphql');
const ip = require('ip');
const PORT = process.env.PORT || 4000; // will read env variable when deployed

const schema = require('./schema');
const client = require('./config.js');

console.log('your ip', ip.address());

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  pretty: true,
  graphiql: true,
}));

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));

client.connect();
