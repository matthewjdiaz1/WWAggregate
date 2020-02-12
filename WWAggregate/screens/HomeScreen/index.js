import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase';

import Button from '../../components/Button';
import styles from './styles';

const HomeScreen = ({ navigation }) => {
  // useEffect(() => {

  // }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

  const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      console.log(`Signing out`);
      navigation.navigate('Auth');
    }).catch(error => {
      console.log(error.message);
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>HomeScreen</Text>
      <Button label={'Scan Barcode'} cta onPress={() => navigation.navigate('ScanBarcode')} />
      <Button label={'Sign out'} onPress={() => handleSignOut()} />
    </View>
  );
}

export default withNavigation(HomeScreen);
