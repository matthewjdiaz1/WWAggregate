import React, { useState, useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as SecureStore from 'expo-secure-store';


import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/Button';
import styles from './styles';

const SIGN_IN = gql`
mutation SignIn($email: String, $password: String, $jwt: String){
  signIn(email: $email, password: $password, jwt: $jwt)
}`;
// const SIGN_IN = gql`
// mutation SignIn($email: String, $password: String, $jwt: String){
//   signIn(email: $email, password: $password, jwt: $jwt) {
//     id
//     firstName
//     lastName
//     email
//     jwt
//   }
// }`;

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [displayScreen, setDisplayScreen] = useState(false);

  const [signIn, { loading, error, data, client }] = useMutation(SIGN_IN);

  useEffect(() => {
    SecureStore.getItemAsync('userJWT').then(jwt => {
      console.log('jwt found in phone storage:', jwt);
      if (jwt) {
        signIn({ variables: { jwt } }).then(({ data }) => {
          console.log('\nafter auto signIn data:', data);
          if (data.signIn !== null) {
            console.log('user auto signed in by jwt from phone storage. new jwt:', data.signIn);
            SecureStore.getItemAsync('userJWT').then(() => {
              navigation.navigate('Home');
            }).catch(err => console.log('err', err || err.message));
          } else {
            console.log('no user found by jwt from phone storage. user must manually sign in');
            setDisplayScreen(true);
            // client.resetStore();
          }
        });
      } else {
        console.log('no jwt found in local storage, must manually enter credentials');
        setDisplayScreen(true);
        // client.resetStore();
      }
    });
  }, []);
  // useEffect(() => {
  //   // search for jwt in phones storage
  //   SecureStore.getItemAsync('userJWT').then(jwt => {
  //     console.log('jwt found in phone storage:', jwt);
  //     // if jwt found in storage...
  //     if (jwt) {
  //       // search db for user by jwt.
  //       signIn({ variables: { jwt } }).then(({ data }) => {
  //         console.log('\nafter auto signIn data:', data);
  //         // if user is found by jwt, it means this was the last device the user
  //         // signed in with, and they may continue to auto signed in.  this will update
  //         // and return a new jwt at data.singIn 
  //         if (data.signIn !== null) {
  //           // update this phones local storage with new jwt, then proceed to 'Home' screen
  //           console.log('user auto signed in by jwt from phone storage. new jwt:', data.signIn);
  //           // SecureStore.setItemAsync('userJWT', data.signIn);
  //           SecureStore.getItemAsync('userJWT').then(() => {
  //             navigation.navigate('Home');
  //           }).catch(err => console.log('err', err || err.message));
  //         } else {
  //           console.log('no user found by jwt from phone storage. user must manually sign in');
  //         }
  //         // if user isn't found by local storage jwt it means either someone has signed in with 
  //         // another device and overwritten their jwt, or this is the first time they've launched 
  //         // the app. The user must manually enter their credentials to sign in with this device.
  //         // This will override current JWT (sign out on all other devices).
  //       });
  //     } else {
  //       console.log('no jwt found in local storage, must manually enter credentials');
  //     }
  //   });
  // }, []);

  const handleSignIn = () => {
    setDisplayScreen(false);
    signIn({
      variables: {
        email,
        password,
      }
    }).then(({ data }) => {
      console.log('data for securestore', data);
      if (data.signIn !== null) {
        SecureStore.setItemAsync('userJWT', data.signIn).then(() => {
          navigation.navigate('Home');
        });
      } else {
        console.log('signIn failed. data:', data);
      }
      return;
    }).catch(e => console.log('signIn .catch', JSON.stringify(e) || e.message));
    setPassword('');
    setDisplayScreen(true);
  }

  if (loading) return <LoadingIndicator />;
  if (!displayScreen) return <LoadingIndicator />;
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
          onChangeText={(email) => setEmail(email.toLowerCase())}
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
      <Text style={[styles.text, { color: 'black' }]} onPress={() => navigation.navigate('SignUp')}>New user? Sign up
        <Text style={[styles.text, { color: 'red' }]} onPress={() => navigation.navigate('SignUp')}> here</Text>
        .
      </Text>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSignIn} label="Sign In" cta />
      </View>
    </View >
  );
}

export default withNavigation(SignInScreen);
