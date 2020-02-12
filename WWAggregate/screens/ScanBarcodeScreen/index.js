import React, { useState, useEffect, setState } from 'react';
import { Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { BarCodeScanner } from 'expo-barcode-scanner';
import CameraOverlay from '../../components/CameraOverlay';
import XButton from '../../components/XButton';
// import GetBarcode from '../../components/queries/GetBarcode';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import styles from './styles';

const GET_BARCODE = gql`
query Barcode($barcode: String!){
  barcode(arg: $barcode) {
    id
    name
    barcode
    nutrition
  }
}
`;

const ScanBarcodeScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // query barcode
  const returnProductInfo = (product, barcode) => {
    // if not in system navigate to DisplayProductScreen
    if (product !== null) {
      console.log('returnProductInfo, not null:', product);
      navigation.navigate('DisplayProduct', { product });
    } else {
      // if not in system, navigate to ItemNotFound
      console.log('returnProductInfo, null:', barcode);
      navigation.navigate('ItemNotFound', { barcode });
    }
    setScanned(false);
  }

  const queryOneBarcode = (barcode) => {
    const { loading, error, data } = useQuery(GET_BARCODE, {
      variables: { barcode: '42069' }
    });
    console.log('loading', loading)
    console.log('error', error)
    console.log('data', data)
    return 'test';
  }

  // TODO - apollo/postgres queries
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log('data from scan:', data);
    console.log(queryOneBarcode(data));
    navigation.navigate('ItemNotFoundScreen', { barcode: data });
  };

  if (hasPermission === null) return <Text>Requesting camera permission</Text>
  if (hasPermission === false) return <Text>No access to camera</Text>
  return (
    <View style={styles.container}>
      <CameraOverlay top={275} bottom={275} left={50} right={50} />
      <XButton onPress={() => navigation.navigate('Home')} />
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
