const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const PORT = 4000;

const client = require('./config.js');
const schema = require('./schema/products.js');

app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
});

client.connect();
