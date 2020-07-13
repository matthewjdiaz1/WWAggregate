import React, { useState, useEffect, useRef } from 'react';
import { withNavigation } from 'react-navigation';
import { Text, View, TextInput } from 'react-native';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as SecureStore from 'expo-secure-store';

import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/Button';
import styles from './styles';

const SIGN_IN = gql`
mutation SignIn($email: String, $password: String, $jwt: String){
  signIn(email: $email, password: $password, jwt: $jwt)
}`;

const SignInScreen = ({ navigation }) => {
  const [displayScreen, setDisplayScreen] = useState(false);
  const passwordRef = useRef();
  const { register, handleSubmit, setValue } = useForm(); // initialise the hook
  const [signIn, { loading, error, data, client }] = useMutation(SIGN_IN);

  useEffect(() => {
    client.resetStore();
    SecureStore.getItemAsync('userJWT').then(jwt => {
      if (jwt) {
        signIn({ variables: { jwt } }).then(({ data }) => {
          if (data.signIn !== null) {
            SecureStore.setItemAsync('userJWT', data.signIn)
              .then(() => navigation.navigate('Home'))
              .catch(err => console.log('err:', err.message || err));
          } else {
            setDisplayScreen(true);
          }
        });
      } else {
        setDisplayScreen(true);
      }
    });
  }, []);

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  const onSubmit = formData => {
    const email = formData.email || '';
    const password = formData.password || '';
    setDisplayScreen(false);

    signIn({ variables: { email, password } })
      .then(({ data }) => SecureStore.setItemAsync('userJWT', data.signIn))
      .then(() => navigation.navigate('Home'))
      .catch(err => {
        console.log('err:', err.message || err);
        setDisplayScreen(true);
        throw new Error('Sign in failed.');
      });
  };

  if (!displayScreen) return <LoadingIndicator text='Logging in...' />;
  if (loading) return <LoadingIndicator />;

  return (
    <View style={styles.container}>
      <ErrorMessage error={error} />
      <Text style={styles.header}>Sign in.</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='EMAIL'
          autoCompleteType='email'
          keyboardAppearance='dark'
          autoCapitalize='none'
          autoCorrect={false}
          blurOnSubmit={false}
          enablesReturnKeyAutomatically={true}
          onChangeText={text => setValue('email', text)}
          returnKeyType={'next'}
          onSubmitEditing={() => { passwordRef.current.focus() }}
        />
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          ref={passwordRef}
          placeholder='PASSWORD'
          autoCompleteType='password'
          secureTextEntry
          keyboardAppearance='dark'
          autoCapitalize='none'
          enablesReturnKeyAutomatically={true}
          onChangeText={text => setValue('password', text)}
          returnKeyType={'done'}
          onSubmitEditing={handleSubmit(onSubmit)}
        />
      </View>
      <Text style={styles.text} onPress={() => navigation.navigate('SignUp')}>New user? Sign up
        <Text style={[styles.text, { color: 'red', fontWeight: '600' }]} onPress={() => navigation.navigate('SignUp')}> here</Text>
        .
      </Text>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSubmit(onSubmit)} label='Sign In' cta />
      </View>
    </View >
  );
};

export default withNavigation(SignInScreen);
