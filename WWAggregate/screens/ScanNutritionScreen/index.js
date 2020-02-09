import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Camera } from 'expo-camera';

import styles from './styles';

const ScanNutritionScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [pic, setPic] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  snap = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      console.log(photo);
      navigation.navigate('DisplayPic', {
        pic: photo,
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
            <Text style={styles.text}>Take Pic</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default withNavigation(ScanNutritionScreen);
