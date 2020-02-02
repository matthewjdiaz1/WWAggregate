import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import { Query } from 'react-apollo';
// import { gql } from 'apollo-boost';

import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import styles from './styles';

const ScanBarcodeScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // TODO - apollo/postgres queries
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    // check database to see if code has been scanned before
    // props.fetchBarcode(data);
    console.log('from scanner:', data);
    navigation.navigate('ItemNotFound');
    // setScanned(false);
    //// if scanned before, show info

    // else, ask user to inter name of product

    // then, ask user to take a picture of the nutrition label

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onPress={() => props.toggle()}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scannerBorder}
      />
      <Text style={styles.text}>Scan a barcode</Text>
      <View style={styles.xButton}>
        <Svg height="20" width="20" viewBox="0 0 300 300">
          <Polygon
            points="298.667,30.187 268.48,0 149.333,119.147 30.187,0 0,30.187 119.147,149.333 0,268.48 30.187,298.667     149.333,179.52 268.48,298.667 298.667,268.48 179.52,149.333"
            fill="white"
            strokeWidth="5"
          />
        </Svg>
      </View>
      <View style={styles.overlay}></View>
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
    </View>
  );
}

export default withNavigation(ScanBarcodeScreen);