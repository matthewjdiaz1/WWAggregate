import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const PinSVG = ({ onPress }) => (
  <View>
    <View onPress={onPress}>
      <Svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/Svg">
        <Path d="M15.7273 8.36364C15.7273 14.0909 8.36364 19 8.36364 19C8.36364 19 1 14.0909 1 8.36364C1 6.41068 1.77581 4.53771 3.15676 3.15676C4.53771 1.77581 6.41068 1 8.36364 1C10.3166 1 12.1896 1.77581 13.5705 3.15676C14.9515 4.53771 15.7273 6.41068 15.7273 8.36364Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M8.36366 10.8182C9.71927 10.8182 10.8182 9.71926 10.8182 8.36365C10.8182 7.00804 9.71927 5.9091 8.36366 5.9091C7.00806 5.9091 5.90912 7.00804 5.90912 8.36365C5.90912 9.71926 7.00806 10.8182 8.36366 10.8182Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  </View>
);

export default PinSVG;
