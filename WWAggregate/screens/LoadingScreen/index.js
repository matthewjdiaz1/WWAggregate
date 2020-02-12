import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import * as firebase from 'firebase';

import styles from './styles';

const Loading = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user', user);
      user ? navigation.navigate('App', { user }) : navigation.navigate('Auth');
    });
  }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

  return (
    <View style={styles.container} >
      <Text style={styles.text} onPress={() => navigation.navigate('Auth')}>Loading...</Text>
      <ActivityIndicator size='large' />
    </View>
  );
}

export default withNavigation(Loading);
