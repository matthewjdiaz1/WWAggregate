import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as SecureStore from 'expo-secure-store';

import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/Button';
import styles from './styles';

const SIGN_UP = gql`
mutation SignUp($email: String!, $password: String!){
  signUp(email: $email, password: $password)
}`;

// TODO - sanitize email and password server side
const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [signUp, { loading, error, data }] = useMutation(SIGN_UP);

  const handleSignUp = () => {
    console.log('sign up with email:', email);
    signUp({
      variables: {
        email,
        password,
      }
    }).then(({ data }) => {
      console.log('data.signUp after singUp', data.signUp);
      if (data.signUp !== null) {
        SecureStore.setItemAsync('userJWT', data.signUp).then(() => {
          navigation.navigate('Home');
        });
      } else {
        console.log('failed to create new user');
      }
    }).catch(e => console.log('signUp .catch', e || e.message));
    setPassword('');
  }

  if (error) console.log(error);
  if (loading) return <LoadingIndicator />
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign up.</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="EMAIL"
          onChangeText={(email) => setEmail(email.toLowerCase())}
          autoCapitalize='none'
          value={email} />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize='none'
          secureTextEntry
          value={password} />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.goBack()} label="Go back" />
        <Button onPress={() => handleSignUp()} label="Sign up" cta />
      </View>
    </View>
  );
}

export default withNavigation(SignUpScreen);
