import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const AddMealSVG = () => (
  <View>
    <Svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <Circle cx="21" cy="21" r="21" fill="#1D262C" />
      <Path d="M21 14V28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M14 21H28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  </View>
);

export default AddMealSVG;
