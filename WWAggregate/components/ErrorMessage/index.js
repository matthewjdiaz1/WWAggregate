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
      if (typeof e.message === 'string') return e.message.split(' ')[0] === 'GraphQL' ? setErrorMessage(e.message.slice(15)) : setErrorMessage(e.message);
      if (e.email) return setErrorMessage(e.email.message);
      if (e.password) return setErrorMessage(e.password.message);
    } else if (typeof e === 'string') return setErrorMessage(e);
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
