import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import MacroArc from '../../components/MacroArc';
import LoadingIndicator from '../../components/LoadingIndicator';
import CaretLeftSVG from '../../components/SVGs/CaretLeftSVG';
import XButtonSVG from '../../components/SVGs/XButtonSVG';

import styles from './styles';

const HARDCODED_GOALS = {
  calories: 2387,
  protein: 150,
  carbohydrates: 330,
  fat: 53,
};
const GET_ITEM_NUTRITION = gql`
query item($itemId: Int){
  item(id: $itemId){
    name
  }
  nutrition(itemId: $itemId) {
    calories
    protein
    fat
    carbohydrates
  }
}`;
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
mutation AddFoodEntry($itemId: Int!) {
  addFoodEntry(itemId: $itemId) {
    id
  }
}`;


const EditFoodScreen = (props, { navigation }) => {
  const [goals, setGoals] = useState(HARDCODED_GOALS);

  const { loading, data, error, client } = useQuery(GET_ITEM_NUTRITION, {
    variables: { itemId: props.navigation.state.params.itemData.itemId },
  });
  console.log('client..', client);
  useEffect(() => {
    const onCompleted = (data) => { props.navigation.state.params.getMacros(data.nutrition) };
    const onError = (error) => { console.log(`meal useEffect error:`, error.message) };
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data);
      } else if (onError && !loading && error) {
        onError(error);
      }
    }
  }, [loading, data, error]);

  // const [addItem] = useMutation(ADD_ITEM,
  // TODO - caching.  this will allow scanned items to immediately show up under meals and history without reloading the app.  
  // {
  //   update(cache, { data: { addItem } }) {
  //     const { item } = cache.readQuery({ query: GET_ITEM });
  //     cache.writeQuery({
  //       query: GET_ITEM,
  //       data: { items: items.concat([addItem]) },
  //     });
  //   }
  // }
  // );
  // const [addFoodEntry] = useMutation(ADD_FOOD_ENTRY);

  // if item is in db, return item info (id) and query/load nutrition info from join table
  const handleAddExistingMeal = () => {
    console.log('variables:', {
      name,
      barcode,
      barcodeType,
      calories: Number(calories),
      protein: Number(protein),
      fat: Number(fat),
      carbohydrates: Number(carbohydrates),
    });
    console.log('data', data);
    addFoodEntry({ variables: { itemId: data.items[0].id } })
      .catch(err => console.log('err', err.message || err));
    // navigation.navigate('Dashboard');
    navigation.navigate('Dashboard', { refetch: true });
  }

  const navToScanNutrition = () => {
    let item = {
      name,
      barcode,
      barcodeType,
      calories: Number(calories),
      protein: Number(protein),
      fat: Number(fat),
      carbohydrates: Number(carbohydrates),
    }
    console.log('item:', item);
    navigation.navigate('ScanNutrition', { item });
  };

  if (loading) return <LoadingIndicator />;
  if (error) {
    console.log('error message:'.error.message);
    return <Text style={styles.header}>Error...</Text>
  };
  console.log('dataaaaaaa:', data);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CaretLeftSVG onPress={() => props.navigation.navigate('Dashboard')} />
        <Text style={styles.headerText}>Edit Meal</Text>
        <CaretLeftSVG color={'transparent'} />
      </View>
      <View style={styles.itemHeaderContainer}>
        <Text style={styles.itemHeaderText}>{data.item.name || 'loading ...'}</Text>
        <Text style={styles.itemHeaderType}>Item Info...</Text>
      </View>
      <View style={styles.itemInfoInputContainer}>
        <Text style={styles.itemInfoInputLabel}>Serving size</Text>
        <Text style={styles.itemInfoInput}>90 grams</Text>
      </View>
      <View style={styles.itemInfoInputContainer}>
        <Text style={styles.itemInfoInputLabel}>Number of servings</Text>
        <Text style={styles.itemInfoInput}>1</Text>
      </View>
      <View style={styles.smallHeaderContainer}>
        <Text style={styles.smallHeaderLabelLeft}>Total calories</Text>
      </View>
      <View style={styles.caloriesContainer}>
        <Text style={styles.caloriesHeader}>{data.nutrition.calories}</Text>
      </View>
      <View style={styles.smallHeaderContainer}>
        <Text style={styles.smallHeaderLabelLeft}>Macros</Text>
      </View>
      <View style={styles.macroContainer}>
        <MacroArc macros={{
          text: 'Protein',
          goal: goals.protein,
          actual: data.nutrition.protein,
          color: '#cb4da2',
        }} />
        <MacroArc macros={{
          text: 'Carbs',
          goal: goals.carbohydrates,
          actual: data.nutrition.carbohydrates,
          color: '#7147d4',
        }} />
        <MacroArc macros={{
          text: 'Fat',
          goal: goals.fat,
          actual: data.nutrition.fat,
          color: '#89d7ef',
        }} />
      </View>
      <View style={styles.footerButtonContainer}>
        <XButtonSVG onPress={() => handleAddExistingMeal()} />
        <Text style={styles.footerButtonText} onPress={() => handleAddExistingMeal()}>Delete</Text>
      </View>
      {/* <XButton onPress={() => navigation.navigate('ScanBarcode')}></XButton>
          <Text style={styles.header}>add meal?</Text>
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
          <View style={styles.buttonContainer}>
            <Button label={'Back'} onPress={() => navigation.navigate('ScanBarcode')} />
            <Button onPress={() => handleAddExistingMeal()} label="Add Item" cta />
          </View> */}
    </View>
  );
};

export default withNavigation(EditFoodScreen);
