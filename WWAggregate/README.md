# Whoop Macros

![](macrozz.gif)

1. [Installing Dependencies](#installing-dependencies)
1. [Config Files](#config-files)


## Installing Dependencies

### From within the root directory...
#### Install Dependencies
```sh
npm install
```
#### Start server
Your IP will be displayed here.  Add it to config file in your root directory to allow graphiql queries at http://<YOUR_IP_ADDRESS>:4000/graphiql
```
npm run server
```
#### Launch app
```
npm expo start
```

## Config Files
### Root Directory
create config.js file in your root directory
```
import ApolloClient from 'apollo-boost';

const apolloIP = new ApolloClient({
  uri: 'http://<YOUR_IP_ADDRESS>:4000/api',
});

export default apolloIP;
```

### Server Folder
create config.js file in your server folder
```
const { Client } = require('pg');

const RDS = {
  host: '<RDS_HOST>',
  user: '<RDS_USER>',
  password: '<RDS_PASSWORD>',
  database: '<RDS_DATABASE>',
};

const client = new Client({
  host: RDS.host,
  user: RDS.user,
  password: RDS.password,
  database: RDS.database,
});

module.exports = {
  client,
  RDS,
};
```
