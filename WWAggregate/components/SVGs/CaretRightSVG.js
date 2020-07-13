import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CaretRightSVG = ({ onPress, color, opacity }) => (
  <View>
    <TouchableOpacity onPress={onPress}>
      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M7.5 5L12.5 10L7.5 15" opacity={opacity ? opacity : 1} stroke={color ? color : "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </TouchableOpacity>
  </View>
);

export default CaretRightSVG;
