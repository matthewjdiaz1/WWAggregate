import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BarcodeSVG = ({ onPress }) => (
  <View>
    <TouchableOpacity onPress={onPress}>
      <Svg width="24" height="20" viewBox="0 0 24 20" fill="none">
        <Path d="M1 5V1H5" stroke="black" strokeWidth="2" strokeLinejoin="round" />
        <Path d="M5 19L1 19L1 15" stroke="black" strokeWidth="2" strokeLinejoin="round" />
        <Path d="M19 1L23 1L23 5" stroke="black" strokeWidth="2" strokeLinejoin="round" />
        <Path d="M23 15L23 19L19 19" stroke="black" strokeWidth="2" strokeLinejoin="round" />
        <Path d="M5 16V4" stroke="black" strokeWidth="2" />
        <Path d="M17 16V4" stroke="black" strokeWidth="2" />
        <Path d="M7.5 16V4" stroke="black" />
        <Path d="M19.5 16V4" stroke="black" />
        <Path d="M13.5 16V4" stroke="black" />
        <Path d="M10.5 16V4" stroke="black" strokeWidth="3" />
      </Svg>
    </TouchableOpacity>
  </View >
);

export default BarcodeSVG;


