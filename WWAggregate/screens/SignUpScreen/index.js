import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/Button';
import styles from './styles';

const SIGN_UP = gql`
mutation SignUp($email: String!, $password: String!){
  signUp(email: $email, password: $password) {
    id
    email
  }
}`;

// TODO - sanitize email and password server side
const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [signUp, { loading, error, data }] = useMutation(SIGN_UP);

  const handleSignUp = () => {
    signUp({
      variables: {
        email,
        password,
      }
    }).then(user => {
      if (user) {
        navigation.navigate('Home', { user: user.user });
      } else {
        console.log('no user found');
      }
    });
    setPassword('');
  }

  if (error) console.log(error);
  if (loading) return <LoadingIndicator />
  return (
    <View style={styles.container}>
      {/* <ErrorMessage error={error} /> */}
      <Text style={styles.header}>Sign up.</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="EMAIL"
          onChangeText={(email) => setEmail(email)}
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
      <Button onPress={() => handleSignUp()} label="Sign up" cta />
      <Button onPress={() => navigation.goBack()} label="Go back" />
    </View>
  );
}

export default withNavigation(SignUpScreen);
