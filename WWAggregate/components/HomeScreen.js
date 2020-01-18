import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Scanner from './Scanner.js';

// const queries = require('../postgres/queries.js');
// const { getProductByBarcode } = require('../postgres/queries.js');
// import queries from '../postgres/queries.js';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
    };
    this.toggleScanner = this.toggleScanner.bind(this);
    this.fetchBarcode = this.fetchBarcode.bind(this);
  }
  toggleScanner() {
    this.setState({ showScanner: !this.state.showScanner });
  }
  fetchBarcode(barcode) {
    console.log('fetchBarcode with barcode', barcode);
    // queries.getProductByBarcode(barcode);
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.showScanner ? (
          <Text style={styles.text} onPress={() => { this.toggleScanner() }}>Open Barcode Scanner</Text>
        ) : (
            // <Text>Close Scanner</Text>
            <Scanner toggle={this.toggleScanner} fetchBarcode={this.fetchBarcode} />
          )}
        <Text style={styles.text}> Show Withings CSV Data </Text>
        <Text style={styles.text}> Show MyFitnessPal CSV Data </Text>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    borderColor: 'turquoise',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 10,
    borderRadius: 35,
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
  barcode: {
    height: 20,
    width: 20,
  }
});
