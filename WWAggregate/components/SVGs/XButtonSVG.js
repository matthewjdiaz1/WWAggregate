import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const XButtonSVG = ({ onPress, color }) => (
  <View>
    <TouchableOpacity onPress={onPress}>
      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M15 5L5 15" stroke={color ? color : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M5 5L15 15" stroke={color ? color : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </TouchableOpacity>
  </View>
);

export default XButtonSVG;
