import React from 'react';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import ScanBarcode from './ScanBarcode/ScanBarcode.js';
import ItemNotFoundModal from './ScanBarcode/ItemNotFoundModal.js';
import ItemNotFound from './ScanBarcode/ItemNotFound';

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
  }

  render() {
    return (
      <View style={styles.container}>
        {/* scan a barcode button */}
        {/* <ScanBarcode style={styles.scanner} toggle={this.toggleScanner} fetchBarcode={this.fetchBarcode} /> */}
        {/* <ItemNotFoundModal /> */}
        <ItemNotFound />
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'purple',
    // borderColor: 'turquoise',
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderStyle: 'solid',
    // borderWidth: 10,
    // borderRadius: 35,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  text: {
    top: 25,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgb(111, 218, 242)',
  },
  scanner: {
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'flex-end',
  },
});
