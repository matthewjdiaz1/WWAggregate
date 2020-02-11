import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import * as firebase from 'firebase';

import Button from '../../components/Button';
import styles from './styles';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        return userCredentials.user.updateProfile({
          displayName: name,
        });
      })
      .catch(error => {
        console.log(error.message);
        alert(error.message);
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign up.</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>enter name</Text>
        <TextInput
          style={styles.input}
          placeholder="NAME"
          onChangeText={(name) => setName(name)}
          value={name} />
        <Text style={styles.inputText}>enter email address</Text>
        <TextInput
          style={styles.input}
          placeholder="EMAIL"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize='none'
          value={email} />
        <Text style={styles.inputText}>enter password</Text>
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize='none'
          secureTextEntry
          value={password} />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSignUp} label="Sign up" cta />
        <Button onPress={() => navigation.goBack()} label="Cancel" />
      </View>
    </View>
  );
}

export default SignUpScreen;
