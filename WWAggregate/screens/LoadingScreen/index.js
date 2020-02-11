import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';

import styles from './styles';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {

    // };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      this.props.navigation.navigate(user ? "App" : "Auth");
    });
  };

  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.text} onPress={() => this.props.navigation.navigate('SignIn')}>loading...</Text>
        <ActivityIndicator size='large' />
      </View>
    );
  };
}
