const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const PORT = process.env.PORT || 4000; // if deployed, will read environment variable

const schema = require('./schema/products.js');

const ip = require('ip');
console.log(ip.address());

app.use('/api', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`)
});

const client = require('./config.js');
client.connect();
