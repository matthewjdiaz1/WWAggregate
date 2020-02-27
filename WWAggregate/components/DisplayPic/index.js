import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';

const DisplayPic = ({ pic }) => {
  console.log(pic);
  return (
    <View style={styles.container}>
      <Image
        // style={[styles.image, { height: navigation.state.params.pic.height, width: navigation.state.params.pic.width }]}
        style={styles.image}
        // style={[styles.image, { height: '50%', width: '50%' }]}
        source={{ uri: pic.uri }}
      />
    </View>
  );
};

export default DisplayPic;
