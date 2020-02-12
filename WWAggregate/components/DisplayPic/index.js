import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';

const DisplayPic = ({ navigation, pic }) => {
  console.log('display pic', navigation.state.params.pic.uri);
  return (
    <View style={styles.container}>
      <Image
        // style={[styles.image, { height: navigation.state.params.pic.height, width: navigation.state.params.pic.width }]}
        style={[styles.image, { height: '100%', width: '100%' }]}
        source={{ uri: navigation.state.params.pic.uri }}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default DisplayPic;
