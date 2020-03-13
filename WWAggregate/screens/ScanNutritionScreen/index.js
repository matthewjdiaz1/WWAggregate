import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Camera } from 'expo-camera';
import { RNS3 } from 'react-native-aws3';
import { RNS3Options } from '../../config';

import styles from './styles';

const ScanNutritionScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [product, setProduct] = useState('PRODUCT');
  // const [product, setProduct] = useState(navigation.state.params.product);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const snap = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      let today = new Date();
      let file = {
        uri: photo.uri,
        name: JSON.stringify(today) + '.jpg',
        type: "image/jpg"
      }

      RNS3.put(file, RNS3Options).then(response => {
        if (response.status !== 201) {
          throw new Error("Failed to upload image to S3");
        } else {
          console.log('Successfully uploaded image to S3');
        }
        console.log('response.body', response.body);
      });
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
