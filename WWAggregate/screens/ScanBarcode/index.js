import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import styles from './styles';

export default ScanBarcode = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    // check database to see if code has been scanned before
    // props.fetchBarcode(data);
    console.log('from scanner:', data);

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
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <Text style={styles.text}> Scan a barcode </Text>
      <BarCodeScanner
        onPress={() => props.toggle()}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scannerBorder}
      />
    </View>
  );
}
