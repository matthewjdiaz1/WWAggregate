import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

// import * as Svg from 'react-native-svg';
// const { Circle, Text } = Svg;
// import Pie from 'react-native-pie'
import { ProgressCircle } from 'react-native-svg-charts'

import LoadingIndicator from '../LoadingIndicator';
import styles from './styles';
import { getDataFromTree } from 'react-apollo';

const MacroArc = ({ macros }) => (
  <View style={styles.container}>
    <ProgressCircle
      style={styles.pie}
      backgroundColor={'#e5e9f3'}
      progress={macros.actual / macros.goal}
      progressColor={macros.actual / macros.goal <= 1 ? macros.color : 'red'} // TODO - show how many cals over you are with red
      cornerRadius={0}
    />
    <Svg style={styles.svgCircle} width="73" height="73" viewBox="-4 -4 69 69" fill="none">
      <Circle cx="30.5" cy="30.5" r="30.5" fill="#FFFFFF" />
      <SvgText style={styles.circleText}>{macros.actual + 'g'}</SvgText>
    </Svg>
    <Text style={styles.text}>{macros.text}</Text>
  </View >
);

export default MacroArc;
