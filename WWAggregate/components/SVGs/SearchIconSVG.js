import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SearchIconSVG = ({ onPress }) => (
  <View>
    <TouchableOpacity onPress={onPress}>
      <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/Svg">
        <Path d="M7.22217 13.4443C10.6586 13.4443 13.4443 10.6586 13.4443 7.22217C13.4443 3.78576 10.6586 1 7.22217 1C3.78576 1 1 3.78576 1 7.22217C1 10.6586 3.78576 13.4443 7.22217 13.4443Z" stroke="#1D262C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M15 14.9999L11.6167 11.6166" stroke="#1D262C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </TouchableOpacity>
  </View>
);

export default SearchIconSVG;
