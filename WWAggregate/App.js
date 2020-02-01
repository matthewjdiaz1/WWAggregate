import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ItemNotFound from './screens/ItemNotFound';
import ScanBarcode from './screens/ScanBarcode';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

export default function App() {
  return (
    <View style={styles.container}>
      <ItemNotFound />
      {/* <ScanBarcode /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
