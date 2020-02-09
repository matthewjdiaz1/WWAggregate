import React, { Component } from 'react';
import { Text, View } from 'react-native';
import gql from "graphql-tag";
import { withNavigation } from 'react-navigation';
import { useQuery, Query, ApolloConsumer } from "@apollo/react-hooks";

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

const GetBarcode = ({ navigation, barcode, scanned, returnProductInfo }) => {
  if (scanned) {
    // else run barcode
    const { loading, error, data } = useQuery(GET_BARCODE, {
      variables: { barcode },
    });
    if (loading) console.log('loading...');
    if (loading) return <View />;
    if (error) console.log('error from GET_BARCODE query', error);

    if (data && !loading) {
      if (data.barcode === null) {
        console.log(barcode, 'not in db');
        return <View onPress={returnProductInfo(data.barcode, barcode)}></View>;
      } else {
        // if not in system, navigate to ItemNotFound
        console.log('GetBarcode data not null');
        // navigation.navigate('ItemNotFound');
        // return <View></View>;
        return <View onPress={returnProductInfo(data.barcode, barcode)}></View>;
      }
    }
  }
  console.log('GetBarcode default return');
  return <View />;
}

export default withNavigation(GetBarcode);
