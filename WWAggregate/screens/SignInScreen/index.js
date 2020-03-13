import React, { useState, useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/Button';
import styles from './styles';

const SIGN_IN = gql`
mutation SignIn($email: String!, $password: String!){
  signIn(email: $email, password: $password) {
    id
    firstName
    lastName
    email
  }
}`;

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [signIn, { loading, error, data }] = useMutation(SIGN_IN);

  const handleSignIn = () => {
    signIn({
      variables: {
        email,
        password,
      }
    }).then(user => navigation.navigate('Home', { user: user.data.signIn }))
      .catch(err => {
        // throw new ErrorMessage(err);
        // console.log('Error from SignInScree.js, no user found?');
        // console.log(JSON.stringify(err));
      });
    setPassword('');
  }

  if (loading) return <LoadingIndicator />
  return (
    <View style={styles.container}>
      {/* TODO - SANITIZE ERROR MESSAGE FROM HERE */}
      {/* <ErrorMessage error={error} /> */}
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
      <Button onPress={handleSignIn} label="Sign In" cta />
    </View >
  );
}

export default withNavigation(SignInScreen);
