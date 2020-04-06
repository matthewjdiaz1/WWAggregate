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

const SIGN_UP = gql`
mutation SignUp($email: String!, $password: String!) {
  signUp(email: $email, password: $password)
}`;

const SignUpScreen = ({ navigation }) => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { register, handleSubmit, setValue, errors, setError, clearError } = useForm();
  const [signUp, { loading, error, data }] = useMutation(SIGN_UP);

  useEffect(() => {
    register({ name: 'email' }, {
      required: true,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address.'
      },
    });
    register({ name: 'password' }, { required: 'Password must not be blank.' });
    register({ name: 'confirmPassword' });
  }, [register]);

  const onSubmit = formData => {
    const email = formData.email || '';
    const password = formData.password || '';
    const confirmPassword = formData.confirmPassword || '';

    if (confirmPassword !== password) return setError("password", "notMatch", "Passwords must match.");

    signUp({ variables: { email, password } })
      .then(({ data }) => {
        console.log('data.signUp after singUp', data.signUp);
        if (data.signUp !== null) {
          SecureStore.setItemAsync('userJWT', data.signUp)
            .then(() => { navigation.navigate('Home') });
        } else {
          console.log('failed to create new user');
        }
        clearError();
      })
      .catch(err => { console.log('signUp .catch', err || err.message) });
  };

  if (loading) return <LoadingIndicator />
  return (
    <View style={styles.container}>
      <ErrorMessage error={errors.email || errors.password ? errors : error} />
      <Text style={styles.header}>Sign up.</Text>
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
          returnKeyType={'next'}
          onSubmitEditing={() => { confirmPasswordRef.current.focus() }}
        />
        <TextInput
          style={styles.input}
          ref={confirmPasswordRef}
          placeholder='CONFIRM PASSWORD'
          autoCompleteType='password'
          secureTextEntry
          keyboardAppearance='dark'
          autoCapitalize='none'
          enablesReturnKeyAutomatically={true}
          onChangeText={text => setValue('confirmPassword', text)}
          returnKeyType={'done'}
          onSubmitEditing={handleSubmit(onSubmit)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.goBack()} label='Go back' />
        <Button onPress={handleSubmit(onSubmit)} label='Sign up' cta />
      </View>
    </View>
  );
}

export default withNavigation(SignUpScreen);
