import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CheckButtonSVG = ({ onPress, color }) => (
  <View>
    <TouchableOpacity onPress={onPress}>
      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke={color ? color : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </TouchableOpacity>
  </View>
);

export default CheckButtonSVG;
