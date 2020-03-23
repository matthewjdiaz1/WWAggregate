import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import XButton from '../../components/XButton';
import Button from '../../components/Button';
import LoadingIndicator from '../../components/LoadingIndicator';

import styles from './styles';

const AUTH_DATA = {
  userId: 420,
};

const GET_ITEM = gql`
query Barcode($barcode: String!) {
	items(barcode: $barcode) {
	  id
    name
    barcode
    barcodeType
    nutrition {
      calories
      fat
      protein
      carbohydrates
    }
	}
}`;

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

const DisplayItemScreen = ({ navigation }) => {
  // query db by item barcode
  const [userId, setUserId] = useState(AUTH_DATA.userId);
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState(navigation.state.params.barcode || "none");
  const [barcodeType, setBarcodeType] = useState(navigation.state.params.barcodeType || "none");
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  const [sugar, setSugar] = useState('');
  const [servingSize, setServingSize] = useState('1');
  const [servingUnit, setServingUnit] = useState('g');

  // query
  const { loading, error, data } = useQuery(GET_ITEM, {
    variables: { barcode },
  });
  if (!loading) {
    // TODO - investigate loading doubled up due to "optimistic response" https://www.apollographql.com/docs/react/performance/optimistic-ui/
  }

  const [addItem] = useMutation(ADD_ITEM,
    // {
    //   update(cache, { data: { addItem } }) {
    //     const { item } = cache.readQuery({ query: GET_ITEM });
    //     cache.writeQuery({
    //       query: GET_ITEM,
    //       data: { items: items.concat([addItem]) },
    //     });
    //   }
    // }
  );
  const [addFoodEntry] = useMutation(ADD_FOOD_ENTRY);


  // // if item is in db, return item info (id) and query/load nutrition info from join table
  const handleOnPress = () => {
    console.log('variables:', {
      name,
      barcode,
      barcodeType,
      calories: Number(calories),
      protein: Number(protein),
      fat: Number(fat),
      carbohydrates: Number(carbohydrates),
    });
    addItem({
      variables: {
        name,
        barcode,
        barcodeType,
        calories: Number(calories),
        protein: Number(protein),
        fat: Number(fat),
        carbohydrates: Number(carbohydrates),
      }
    }).then(({ data: { addItem: { id } } }) => {
      // addFoodEntry
      console.log('id', id);
      console.log('data', data);
      addFoodEntry({
        variables: {
          userId: AUTH_DATA.userId,
          itemId: id,
          servingSize: Number(servingSize),
          servingUnit,
        }
      })
    });
    navigation.navigate('Home');
  }
  // // if item isn't in db, navigate to ItemNotFoundScreen

  if (loading) return <LoadingIndicator />;
  if (error) return <Text style={styles.header}>Error</Text>;
  return (
    <>
      {data.items[0] ? (
        <View style={styles.container}>
          <Text style={styles.header}>add meal?</Text>
          {/* <Text style={styles.text}>id: {data.items[0].id}</Text> */}
          {/* <Text style={styles.text}>name: </Text> */}
          {/* <Text style={styles.text}>barcode: {data.items[0].barcode}</Text> */}
          {/* <Text style={styles.text}>barcode type: {data.items[0].barcodeType}</Text> */}
          <Text style={styles.text}>{data.items[0].name}</Text>
          <Text style={styles.text}>calories: {data.items[0].nutrition.calories || 0}</Text>
          <Text style={styles.text}>fat: {data.items[0].nutrition.fat || 0}</Text>
          <Text style={styles.text}>protein: {data.items[0].nutrition.protein || 0}</Text>
          <Text style={styles.text}>carbohydrates: {data.items[0].nutrition.carbohydrates || 0}</Text>
          <Text style={styles.inputLabel}>serving size</Text><TextInput
            style={styles.input}
            placeholder="90"
            onChangeText={(text) => setServingSize(text)}
            value={servingSize} />
          <XButton onPress={() => navigation.navigate('ScanBarcode')}></XButton>
          <View style={styles.buttonContainer}>
            <Button label={'Back'} onPress={() => navigation.navigate('ScanBarcode')} />
            <Button onPress={() => handleOnPress()} label="Add Item" cta />
          </View>
        </View>
      ) : (
          <View style={styles.container}>
            <Text style={styles.header}>Item not found</Text>
            <Text style={styles.text}>Add a product name and nutritional info to add an item to your library.</Text>
            <View>
              <Text style={styles.inputLabel}>Item Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Organic Applesauce"
                onChangeText={(text) => setName(text)}
                autoCapitalize={'words'}
                value={name} />
              <Text style={styles.text}></Text>
              <Text style={styles.inputLabel}>Calories</Text>
              <TextInput
                enablesReturnKeyAutomatically={true}
                style={styles.input}
                placeholder="0"
                // keyboardType={'number-pad'}
                returnKeyType={'next'}
                onChangeText={(text) => setCalories(text)}
                value={calories} />
              <Text style={styles.inputLabel}>Protein</Text>
              <TextInput
                enablesReturnKeyAutomatically={true}
                style={styles.input}
                placeholder="0"
                // keyboardType={'number-pad'}
                returnKeyType={'next'}
                onChangeText={(text) => setProtein(text)}
                value={protein} />
              <Text style={styles.inputLabel}>Fat</Text>
              <TextInput
                enablesReturnKeyAutomatically={true}
                style={styles.input}
                placeholder="0"
                // keyboardType={'numeric'}
                returnKeyType={'next'}
                onChangeText={(text) => setFat(text)}
                value={fat} />
              <Text style={styles.inputLabel}>Carbohydrates</Text>
              <TextInput
                enablesReturnKeyAutomatically={true}
                style={styles.input}
                placeholder="0"
                // keyboardType={'numeric'}
                returnKeyType={'next'}
                onChangeText={(text) => setCarbohydrates(text)}
                value={carbohydrates} />
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={() => navigation.navigate('ScanBarcode')} label="Back" />
              <Button onPress={() => handleOnPress()} label="Add Item" cta />
            </View>
          </View>
        )}
    </>
  );
};

export default withNavigation(DisplayItemScreen);
