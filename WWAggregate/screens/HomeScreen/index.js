import React from 'react';
import { Text, View } from 'react-native';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import SearchBarcodes from '../../components/Queries/GetBarcode';

import styles from './styles';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: '42069',
    };
    this.fetchBarcode = this.fetchBarcode.bind(this);
  }
  fetchBarcode(barcode) {
    console.log('barcode', barcode);
  }

  render() {
    console.log(() => fetchBarcode('fetch test'));
    return (
      <View style={styles.container}>
        <Text onPress={() => this.fetchBarcode(this.state.barcode)}>test</Text>
        <Barcodes onBarcodeSelected={this.state.barcode}></Barcodes>
      </View>
    );
  }
}

export default HomeScreen;
