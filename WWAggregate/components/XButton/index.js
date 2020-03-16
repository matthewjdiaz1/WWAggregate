import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

import styles from './styles';

const XButton = ({ onPress }) => (
  <View style={styles.xButton}>
    <TouchableOpacity style={styles.buttonTouchableOpacity} onPress={onPress}>
      <Svg height="20" width="20" viewBox="0 0 300 300">
        <Polygon
          points="298.667,30.187 268.48,0 149.333,119.147 30.187,0 0,30.187 119.147,149.333 0,268.48 30.187,298.667     149.333,179.52 268.48,298.667 298.667,268.48 179.52,149.333"
          fill="white"
          strokeWidth="5"
        />
      </Svg>
    </TouchableOpacity>
  </View>
);

XButton.defaultProps = {
  onPress: () => { },
};

export default XButton;
