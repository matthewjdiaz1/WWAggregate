import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import AppContainer from './navigation/AppContainer.js';

const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  );
}
