import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from './styles';

const Button = ({ label, cta, onPress }) => (
  <View style={cta ? styles.containerCTA : styles.container} onPress={onPress}>
    <TouchableHighlight onPress={onPress} underlayColor={'#000000'}>
      <Text style={cta ? styles.buttonTextCTA : styles.buttonText}>{label}</Text>
    </TouchableHighlight>
  </View>
);

Button.defaultProps = {
  onPress: () => { },
};

export default Button;
