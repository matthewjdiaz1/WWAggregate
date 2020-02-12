import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import * as firebase from 'firebase';

import Button from '../../components/Button';
import styles from './styles';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error.message);
        alert(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign in.</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="EMAIL"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize='none'
          value={email} />
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize='none'
          secureTextEntry
          value={password} />
      </View>
      <Text style={[styles.text, { color: 'black' }]}>New user? Sign up
        <Text style={[styles.text, { color: 'red' }]} onPress={() => navigation.navigate('SignUp')}> here</Text>
        .
      </Text>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSignIn} label="Sign In" cta />
        <Button onPress={() => navigation.goBack()} label="cancel" />
      </View>
    </View >
  );
}

export default SignInScreen;
