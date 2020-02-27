import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import styles from './styles';

const LoadingIndicator = () => {
  return (
    <View style={styles.container} >
      <Text style={styles.text}>Loading...</Text>
      <ActivityIndicator size='large' />
    </View>
  );
}

export default LoadingIndicator;
