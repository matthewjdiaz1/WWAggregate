# WWAggregate

## Config
create server/config.js file
```
const { Client } = require('pg');

const config = {
  host: "localhost",
  user: "{YOUR_POSTGRES_USERNAME}",
  password: "{YOUR_POSTGRES_PASSWORD}",
  database: "wwaggregate"
};

const client = new Client(config);

module.exports = client;
```
