import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Button from '../../components/Button';

import styles from './styles';

const SignInScreen = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const func = () => {
    console.log('func');
  }
  // "Sup, sign in?"
  // username: <input>
  // passord: <input>
  // forgot pass? <link> to screen
  // create username <link> to creen
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign in.</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={(username) => setUsername(username)}
          value={username} />
        <TextInput
          style={styles.input}
          placeholder="password"
          onChangeText={(password) => setPassword(password)}
          value={password} />
      </View>
      <Text style={styles.text}>forgot password?</Text>
      <Text style={styles.text}>new user?</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.navigate('screen')} label="Sign In" cta />
        <Button label="Cancel" />
      </View>
    </View>
  );
}

export default SignInScreen;
