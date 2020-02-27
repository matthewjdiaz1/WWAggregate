import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import styles from './styles';

const ErrorMessage = (props) => {
  const [error, setErr] = useState(props.error);
  return (
    <>
      {error ? (
        <View>
          <Text style={styles.header}>{error.graphQLErrors[0].message}</Text>
        </View>
      ) : (
          <View>
            <Text style={styles.header}></Text>
          </View>
        )}
    </>
  );
}

export default ErrorMessage;
