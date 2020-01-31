import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

class ItemNotFoundModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      setHasPermission: null,
      scanned: false,
      setSanned: false,
    };
    this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this);
  }

  useEffect = (() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    // check database to see if code has been scanned before
    // props.fetchBarcode(data);
    console.log('from scanner:', data);

    //// if scanned before, show info

    // else, ask user to inter name of product

    // then, ask user to take a picture of the nutrition label

  };

  render() {
    if (this.state.hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (this.state.hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
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
  }
}

export default ItemNotFoundModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: 10,
    width: '100%',
  },
  scannerBorder: {
    position: "absolute",
    height: '100%',
    width: '100%',
    // top: 100, /////////////////////////
  },
  text: {
    top: 25,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgb(111, 218, 242)',
  },
});
