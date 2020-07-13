import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import XButton from '../../components/XButton';
import Button from '../../components/Button';
import MacroArc from '../../components/MacroArc';
import LoadingIndicator from '../../components/LoadingIndicator';
import CaretLeftSVG from '../../components/SVGs/CaretLeftSVG';
import CheckButtonSVG from '../../components/SVGs/CheckButtonSVG';

import styles from './styles';

/**
 * TODO
 * split into two screens, ItemNotFoundScreen and DisplayItemScreen.
 * decide which screen to switch to from ScanBarcodeScreen. edit logic in handleBarCodeScanned()?
 * 
 * need a unit picker.  ['g', 'cups', 'oz', 'ml', ...]
 */
const HARDCODED_GOALS = {
  calories: 2387,
  protein: 150,
  carbohydrates: 330,
  fat: 53,
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
const GET_FOOD_ENTRIES = gql`
query FoodEntries ($from: String, $to: String, $userId: Number) {
  foodEntries (from: $from, to: $to, userId: $userId) {
    id
    userId
    itemId
  }
}`;
const GET_FOOD_ENTRIES_HARDCODE = gql`
query FoodEntries ($from: String, $to: String, $userId: Int) {
  foodEntries (from: $from, to: $to, userId: $userId) {
    id
    userId
    itemId
  }
}`;

const ADD_ITEM = gql`
mutation AddItem($name: String!, $barcode: String!, $barcodeType: String!, $calories: Int!, $protein: Int!, $carbohydrates: Int!, $fat: Int!) {
  addItem(name: $name, barcode: $barcode, barcodeType: $barcodeType, calories: $calories, protein: $protein, carbohydrates: $carbohydrates, fat: $fat) {
    id
  }
}`;

const ADD_FOOD_ENTRY = gql`
mutation AddFoodEntry($itemId: Int!, $userId: Int) {
  addFoodEntry(itemId: $itemId, userId: $userId) {
    id
  }
}`;

// TODO - investigate loading doubled up due to "optimistic response" https://www.apollographql.com/docs/react/performance/optimistic-ui/

const DisplayItemScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState(navigation.state.params.barcode || "none");
  const [barcodeType, setBarcodeType] = useState(navigation.state.params.barcodeType || "none");
  const [goals, setGoals] = useState(HARDCODED_GOALS);
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  const [sugar, setSugar] = useState('');
  const [servingSize, setServingSize] = useState('1');
  const [servingUnit, setServingUnit] = useState('g');

  // query
  const { loading, error, data, client } = useQuery(GET_ITEM, {
    variables: { barcode },
  });

  const [addItem] = useMutation(ADD_ITEM);

  const [addFoodEntry] = useMutation(ADD_FOOD_ENTRY, {
    update(cache, { data: { addFoodEntry } }) {
      const { foodEntries } = cache.readQuery({ query: GET_FOOD_ENTRIES });
      console.log('addFoodEntry', addFoodEntry);
      console.log('client', client);
      // TODO -  create GET_USER_ID query and replace hardcoded userId
      // console.log('food entries..', foodEntries);

      cache.writeQuery({
        query: GET_FOOD_ENTRIES,
        data: { foodEntries: foodEntries.concat([addFoodEntry]) },
      });
    }
  });

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
    addFoodEntry({ variables: { itemId: data.items[0].id, userId: 420 } })
      .catch(err => console.log('err', err.message || err));
    // navigation.navigate('Dashboard');
    // navigation.navigate('Dashboard', { refetch: true });
    navigation.navigate('Home');
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
  }

  return (
    <>
      {data.items[0] ? (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <CaretLeftSVG onPress={() => navigation.navigate('Home')} />
            <Text style={styles.headerText}>Add Food</Text>
            <CaretLeftSVG color={'transparent'} />
          </View>
          <View style={styles.itemHeaderContainer}>
            <Text style={styles.itemHeaderText}>{data.items[0].name || 'loading ...'}</Text>
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
            <Text style={styles.caloriesHeader}>{data.items[0].nutrition.calories}</Text>
          </View>
          <View style={styles.smallHeaderContainer}>
            <Text style={styles.smallHeaderLabelLeft}>Macros</Text>
          </View>
          <View style={styles.macroContainer}>
            <MacroArc macros={{
              text: 'Protein',
              goal: goals.protein,
              actual: data.items[0].nutrition.protein,
              color: '#cb4da2',
            }} />
            <MacroArc macros={{
              text: 'Carbs',
              goal: goals.carbohydrates,
              actual: data.items[0].nutrition.carbohydrates,
              color: '#7147d4',
            }} />
            <MacroArc macros={{
              text: 'Fat',
              goal: goals.fat,
              actual: data.items[0].nutrition.fat,
              color: '#89d7ef',
            }} />
          </View>
          <View style={styles.footerButtonContainer}>
            <CheckButtonSVG onPress={() => handleAddExistingMeal()} />
            <Text style={styles.footerButtonText} onPress={() => handleAddExistingMeal()}>Add</Text>
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
      ) : (
          <View style={styles.container}>
            <XButton color="#000000" onPress={() => navigation.navigate('ScanBarcode')}></XButton>
            <Text style={styles.header}>Item Not Found</Text>
            <Text style={styles.text}>Add a product name and nutritional info to add an item to your library.</Text>
            <View style={styles.inputContainer}>
              <View>
                <Text style={styles.inputLabel}>Item Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder='ex: Organic Applesauce'
                  placeholderTextColor='#87939E'
                  onChangeText={(text) => setName(text)}
                  autoCapitalize={'words'}
                  value={name} />
              </View>
              <View>
                <Text style={styles.inputLabel}>Calories</Text>
                <TextInput
                  style={styles.input}
                  enablesReturnKeyAutomatically={true}
                  placeholder='0'
                  placeholderTextColor='#87939E'
                  // keyboardType={'number-pad'}
                  // keyboardType={'numeric'}
                  returnKeyType={'next'}
                  onChangeText={(text) => setCalories(text)}
                  value={calories} />
              </View>
              <View>
                <Text style={styles.inputLabel}>Protein</Text>
                <TextInput
                  enablesReturnKeyAutomatically={true}
                  style={styles.input}
                  placeholder='0'
                  placeholderTextColor='#87939E'
                  // keyboardType={'number-pad'}
                  // keyboardType={'numeric'}
                  returnKeyType={'next'}
                  onChangeText={(text) => setProtein(text)}
                  value={protein} />
              </View>
              <View>
                <Text style={styles.inputLabel}>Fat</Text>
                <TextInput
                  enablesReturnKeyAutomatically={true}
                  style={styles.input}
                  placeholder='0'
                  placeholderTextColor='#87939E'
                  // keyboardType={'numeric'}
                  returnKeyType={'next'}
                  onChangeText={(text) => setFat(text)}
                  value={fat} />
              </View>
              <View>
                <Text style={styles.inputLabel}>Carbohydrates</Text>
                <TextInput
                  enablesReturnKeyAutomatically={true}
                  style={styles.input}
                  placeholder='0'
                  placeholderTextColor='#87939E'
                  // keyboardType={'numeric'}
                  returnKeyType={'next'}
                  onChangeText={(text) => setCarbohydrates(text)}
                  value={carbohydrates} />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={() => navToScanNutrition()} label="Scan Label" cta />
            </View>
          </View>
        )}
    </>
  );
};

export default withNavigation(DisplayItemScreen);
