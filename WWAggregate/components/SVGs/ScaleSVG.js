import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ScaleSVG = ({ onPress }) => (
  <View>
    <View onPress={onPress}>
      <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/Svg">
        <Path d="M15 1H3C1.89543 1 1 1.71634 1 2.6V15.4C1 16.2837 1.89543 17 3 17H15C16.1046 17 17 16.2837 17 15.4V2.6C17 1.71634 16.1046 1 15 1Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M9 14H9.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  </View>
);

export default ScaleSVG;
