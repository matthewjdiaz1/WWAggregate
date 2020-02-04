import React from 'react';
import { View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

import styles from './styles';

const CameraOverlay = ({ top, bottom, left, right }) => (
  <View
    style={[
      styles.overlay,
      { borderTopWidth: top, borderBottomWidth: bottom, borderLeftWidth: left, borderRightWidth: right }
    ]}>
    <Svg height="22" width="22" style={styles.cornerTL}>
      <Polygon points="22,0 22,6 6,6 6,22 0,22 0,0" fill="white" />
    </Svg>
    <Svg height="22" width="22" style={styles.cornerTR}>
      <Polygon points="0,0 22,0 22,22 16,22 16,6 0,6" fill="white" />
    </Svg>
    <Svg height="22" width="22" style={styles.cornerBR}>
      <Polygon points="0,22 22,22 22,0 16,0 16,16 0,16" fill="white" />
    </Svg>
    <Svg height="22" width="22" style={styles.cornerBL}>
      <Polygon points="0,0 0,22 22,22 22,16 6,16 6,0" fill="white" />
    </Svg>
  </View >
);

export default CameraOverlay;
