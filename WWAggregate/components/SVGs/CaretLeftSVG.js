import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CaretLeftSVG = ({ onPress }) => (
  <View>
    <TouchableOpacity onPress={onPress}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </TouchableOpacity>
  </View>
);

export default CaretLeftSVG;
