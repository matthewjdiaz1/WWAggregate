import React, { useState, useEffect, setState } from 'react';
import { Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { BarCodeScanner } from 'expo-barcode-scanner';
import CameraOverlay from '../../components/CameraOverlay';
import XButton from '../../components/XButton';

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

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log('nav to display with barcode', data);
    navigation.navigate('DisplayItem', { barcodeType: type, barcode: data });
    setScanned(false);
  };

  if (hasPermission === null) return <Text>Requesting camera permission</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;
  return (
    <View style={styles.container}>
      <CameraOverlay top={275} bottom={275} left={50} right={50} />
      <XButton onPress={() => navigation.goBack()} />
      <Text style={styles.text}>Scan a barcode</Text>
      <BarCodeScanner
        onPress={() => props.toggle()}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scannerBorder}
      />
    </View>
  );
}

export default withNavigation(ScanBarcodeScreen);
