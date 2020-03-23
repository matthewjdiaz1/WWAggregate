import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SettingsSVG = ({ onPress }) => (
  <View>
    <TouchableOpacity onPress={onPress}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M4 21V14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M4 10V3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M12 21V12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M12 8V3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M20 21V16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M20 12V3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M1 14H7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M9 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M17 16H23" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </TouchableOpacity>
  </View>
);

export default SettingsSVG;
