import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import AppContainer from './navigation/AppContainer.js';
import apolloIP from './config';

export default function App() {
  return (
    <ApolloProvider client={apolloIP}>
      <AppContainer />
    </ApolloProvider>
  );
}
