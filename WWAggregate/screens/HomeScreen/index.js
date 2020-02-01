import React from 'react';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
// import ScanBarcode from '../../components/ScanBarcode';
// import ItemNotFound from '../ItemNotFound';

import styles from './styles';

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
        {/* <ScanBarcode style={styles.scanner} toggle={this.toggleScanner} fetchBarcode={this.fetchBarcode} /> */}
        <ItemNotFound />
      </View>
    );
  }
}

export default HomeScreen;
