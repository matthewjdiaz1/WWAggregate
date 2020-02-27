import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import XButton from '../../components/XButton';
import Button from '../../components/Button';
import LoadingIndicator from '../../components/LoadingIndicator';

import styles from './styles';

const GET_ITEM = gql`
query Barcode($barcode: String!){
	items(barcode: $barcode) {
	  id
    name
    barcode
    barcodeType
    nutrition {
      calories
      sugar
      protein
      carbohydrates
    }
	}
}`;

const ADD_ITEM = gql`
mutation AddItem($name: String!, $barcode: String!, $barcodeType: String!, $calories: String!, $sugar: String!, $protein: String!, $carbohydrates: String!) {
  addItem(name: $name, barcode: $barcode, barcodeType: $barcodeType, calories: $calories, sugar: $sugar, protein: $protein, carbohydrates: $carbohydrates) {
    id
    name
    barcode
    barcodeType
  }
}`;

const DisplayItemScreen = ({ navigation }) => {
  // query db by item barcode
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [sugar, setSugar] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  const [barcode, setBarcode] = useState(navigation.state.params.barcode);
  const [barcodeType, setBarcodeType] = useState(navigation.state.params.barcodeType);

  // query
  const { loading, error, data } = useQuery(GET_ITEM, {
    variables: { barcode },
  });
  if (!loading) {
    // TODO - investigate doubled up due to "optimistic response" https://www.apollographql.com/docs/react/performance/optimistic-ui/
    // console.log('barcode:    ', barcode);
    // console.log('barcodeType:', barcodeType);
    // console.log('query data: ', data);
  }

  // mutation 
  // add new item w/ name, barcode and barcodeType
  // add nutrition
  const [addItem] = useMutation(ADD_ITEM,
    {
      update(cache, { data: { addItem } }) {
        const { item } = cache.readQuery({ query: GET_ITEM });
        cache.writeQuery({
          query: GET_ITEM,
          data: { items: items.concat([addItem]) },
        });
      }
    }
  );

  // // if item is in db, return item info (id) and query/load nutrition info from join table
  const handleOnPress = () => {
    addItem({
      variables: {
        name,
        barcode,
        barcodeType,
        calories,
        protein,
        sugar,
        carbohydrates,
      }
    });
    // console.log('added item:', mutationData.data);
    navigation.navigate('ScanBarcode');
  }
  // // if item isn't in db, navigate to ItemNotFoundScreen

  if (loading) return <LoadingIndicator />;
  if (error) return <Text style={styles.header}>Error</Text>;

  // console.log('name:', name);
  // console.log('barcode:', barcode);
  // console.log('calories:', calories);
  return (
    <>
      {data.items.length > 0 ? (
        <View style={styles.container}>
          <Text style={styles.header}>{data.items[0].name}</Text>
          <Text style={styles.text}>id: {data.items[0].id}</Text>
          {/* <Text style={styles.text}>name: </Text> */}
          <Text style={styles.text}>barcode: {data.items[0].barcode}</Text>
          <Text style={styles.text}>barcode type: {data.items[0].barcodeType}</Text>
          <Text style={styles.text}>calories: {data.items[0].nutrition.calories}</Text>
          <Text style={styles.text}>sugar: {data.items[0].nutrition.sugar}</Text>
          <Text style={styles.text}>protein: {data.items[0].nutrition.protein}</Text>
          <Text style={styles.text}>carbohydrates: {data.items[0].nutrition.carbohydrates}</Text>
          <XButton onPress={() => navigation.navigate('ScanBarcode')}></XButton>
          <View style={styles.buttonContainer}>
            <Button label={'Back'} onPress={() => navigation.navigate('ScanBarcode')} />
            <Button label={'Button 1'} onPress={() => navigation.navigate('next screen')} cta />
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
                value={name} />
              <Text style={styles.text}></Text>
              <Text style={styles.inputLabel}>Calories</Text>
              <TextInput
                style={styles.input}
                placeholder="15"
                onChangeText={(text) => setCalories(text)}
                value={calories} />
              <Text style={styles.inputLabel}>Protein</Text>
              <TextInput
                style={styles.input}
                placeholder="15"
                onChangeText={(text) => setProtein(text)}
                value={protein} />
              <Text style={styles.inputLabel}>Sugar</Text>
              <TextInput
                style={styles.input}
                placeholder="15"
                onChangeText={(text) => setSugar(text)}
                value={sugar} />
              <Text style={styles.inputLabel}>Carbohydrates</Text>
              <TextInput
                style={styles.input}
                placeholder="15"
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
}

export default withNavigation(DisplayItemScreen);
