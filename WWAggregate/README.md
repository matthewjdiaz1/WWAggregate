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

create config.js file

```
import ApolloClient from 'apollo-boost';

const apolloIP = new ApolloClient({
  uri: 'http://000.000.0.000:4000/api',     // your ip
});

export default apolloIP;
```
