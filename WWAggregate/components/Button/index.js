import React from 'react';
import { Text, View, } from 'react-native';

import styles from './styles';

const Button = ({ label, cta }) => (
  <View style={cta ? styles.buttonViewCTA : styles.buttonView}>
    <Text style={styles.button}>
      {label}
    </Text>
  </View>
);

export default Button;
