import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import styles from './styles';

const LoadingIndicator = ({ text }) => (
  <>
    {text ? (
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <ActivityIndicator size='large' />
      </View>
    ) : (
        <View style={styles.container}>
          <Text style={styles.text}>Loading...</Text>
          <ActivityIndicator size='large' />
        </View>
      )}
  </>
);

export default LoadingIndicator;
