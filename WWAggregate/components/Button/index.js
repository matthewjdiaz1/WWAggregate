import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import styles from './styles';

const Button = ({ label, cta, onPress }) => (
  <View style={cta ? styles.buttonViewCTA : styles.buttonView} onPress={onPress}>
    <TouchableHighlight onPress={onPress} underlayColor={'#B4EDFA'}>
      <Text style={styles.button}>
        {label}
      </Text>
    </TouchableHighlight>
  </View>
);

Button.defaultProps = {
  onPress: () => { },
};

export default Button;
