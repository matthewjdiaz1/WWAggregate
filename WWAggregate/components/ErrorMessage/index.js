import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const ErrorMessage = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    traverseError(props.error);
  });

  const traverseError = (e) => {
    if (typeof e === 'object' && e !== null) {
      if (typeof e.message === 'string') {
        e.message.split(' ')[0] === 'GraphQL' ? setErrorMessage(e.message.slice(15)) : setErrorMessage(e.message);
        return;
      }
      if (e.email) {
        setErrorMessage(e.email.message);
        return;
      }
      if (e.password) {
        setErrorMessage(e.password.message);
        return;
      }
    } else if (typeof e === 'string') {
      setErrorMessage(e);
    }
    return;
  };

  return (
    <>
      {errorMessage ? (
        <View>
          <Text style={styles.header}>{errorMessage}</Text>
        </View>
      ) : (
          <View />
        )}
    </>
  );
};

export default ErrorMessage;
