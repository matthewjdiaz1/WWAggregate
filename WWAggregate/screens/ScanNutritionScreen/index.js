import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Camera } from 'expo-camera';
import { RNS3 } from 'react-native-aws3';
import { RNS3Options } from '../../config';

import styles from './styles';

const AUTH_DATA = {
  userId: 420
};
const ADD_ITEM = gql`
mutation AddItem($name: String!, $barcode: String!, $barcodeType: String!, $calories: Int!, $protein: Int!, $carbohydrates: Int!, $fat: Int!) {
  addItem(name: $name, barcode: $barcode, barcodeType: $barcodeType, calories: $calories, protein: $protein, carbohydrates: $carbohydrates, fat: $fat) {
    id
  }
}`;
const ADD_FOOD_ENTRY = gql`
mutation AddFoodEntry($userId: Int!, $itemId: Int!, $servingSize: Int, $servingUnit: String) {
  addFoodEntry(userId: $userId, itemId: $itemId, servingSize: $servingSize, servingUnit: $servingUnit) {
    id
  }
}`;

const ScanNutritionScreen = ({ navigation }) => {
  const [item, setItem] = useState(navigation.state.params.item);
  const [hasPermission, setHasPermission] = useState(null);
  const [product, setProduct] = useState('PRODUCT');
  // const [product, setProduct] = useState(navigation.state.params.product);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);

  // queries/mutations
  const [addItem] = useMutation(ADD_ITEM);
  const [addFoodEntry] = useMutation(ADD_FOOD_ENTRY);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const snap = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();

      addItem({
        variables: item,
      }).then(({ data: { addItem: { id } } }) => {
        console.log('id', id);
        addFoodEntry({
          variables: {
            userId: AUTH_DATA.userId,
            itemId: id,
            servingSize: 1,
            servingUnit: 'g',
          }
        }).then(({ data: { addFoodEntry: { id } } }) => {
          let file = {
            uri: photo.uri,
            name: `${id}.jpg`,
            type: 'image/jpg',
          };

          RNS3.put(file, RNS3Options).then(response => {
            if (response.status !== 201) {
              throw new Error('Failed to upload image to S3');
            } else {
              console.log('Successfully uploaded image to S3');
            }
            console.log('response.body', response.body);
          });
        })
      }).then(() => {
        navigation.navigate('Home');
      });
    } else {
      console.log('error, no camera');
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={ref => setCamera(ref)}>
        <View style={styles.camera}>
          <TouchableOpacity
            style={styles.takePic}
            onPress={() => snap()}>
            <Text style={[styles.text, { justifyContent: 'center', alignItems: 'center' }]}>Take Pic</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default withNavigation(ScanNutritionScreen);
