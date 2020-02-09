import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import XButton from '../../components/XButton';
import styles from './styles';

const DisplayProductScreen = ({ navigation }) => {
  const product = navigation.state.params.product;
  console.log(navigation);
  return (
    <View style={styles.container}>
      <XButton onPress={() => navigation.goBack()}></XButton>
      <Text style={styles.text}>id: {product.id}</Text>
      <Text style={styles.text}>name: {product.name}</Text>
      <Text style={styles.text}>barcode: {product.barcode}</Text>
      <Text style={styles.text}>nutrition: {product.nutrition}</Text>
    </View>
  );
};

export default withNavigation(DisplayProductScreen);
