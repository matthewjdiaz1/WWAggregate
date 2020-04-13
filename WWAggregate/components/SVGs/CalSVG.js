import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CalSVG = ({ onPress }) => (
  <View>
    <View onPress={onPress}>
      <Svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/Svg">
        <Path d="M15.4 2.8H2.8C1.80589 2.8 1 3.60589 1 4.6V17.2C1 18.1941 1.80589 19 2.8 19H15.4C16.3941 19 17.2 18.1941 17.2 17.2V4.6C17.2 3.60589 16.3941 2.8 15.4 2.8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M12.7 1V4.6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M5.5 1V4.6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M1 8.2H17.2" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  </View>
);

export default CalSVG;
