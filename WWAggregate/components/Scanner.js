import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default Scanner = (props) => {
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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // console.log(StyleSheet.absoluteFillObject);
  // console.log(StyleSheet.scannerBorder);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <Text style={styles.text} onPress={() => props.toggle()}>Close Barcode Scanner</Text>
      <BarCodeScanner
        onPress={() => props.toggle()}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scannerBorder}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

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
    height: '50%',
    width: '50%',
    top: 50, /////////////////////////
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'turquoise',
    backgroundColor: 'fuchsia',
    textShadowColor: 'blue',
    textShadowRadius: 5,
    textShadowOffset: { width: -2, height: 2 },
  },
});
