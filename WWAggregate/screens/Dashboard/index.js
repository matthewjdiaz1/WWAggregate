import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';

import * as SecureStore from 'expo-secure-store';

import ErrorMessage from '../../components/ErrorMessage';
import MacroArc from '../../components/MacroArc';
import MealEntry from '../../components/MealEntry';
import LoadingIndicator from '../../components/LoadingIndicator';
import CaretLeftSVG from '../../components/SVGs/CaretLeftSVG';
import CaretRightSVG from '../../components/SVGs/CaretRightSVG';
import SettingsSVG from '../../components/SVGs/SettingsSVG';
import AddMealSVG from '../../components/SVGs/AddMealSVG';
import ProfileSVG from '../../components/SVGs/ProfileSVG';
import styles from './styles';

const HARDCODED_GOALS = {
  calories: 2387,
  protein: 150,
  carbohydrates: 330,
  fat: 53,
};

const GET_FOOD_ENTRIES = gql`
query FoodEntries ($from: String, $to: String) {
  foodEntries (from: $from, to: $to) {
    id
    userId
    itemId
  }
}`;
const LOGOUT = gql`
mutation Logout{
  logout
}`;

const Dashboard = ({ navigation }) => {
  const [displayScreen, setDisplayScreen] = useState(true);
  // const [hasLocationPermission, setHasLocationPermission] = useState(true);
  // const [location, setLocation] = useState(null);
  // const [geocode, setGeocode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [goals, setGoals] = useState(HARDCODED_GOALS);
  const [macros, setMacros] = useState({
    calories: [],
    protein: [],
    carbohydrates: [],
    fat: [],
  });
  const [caloriesEaten, setCaloriesEaten] = useState(HARDCODED_GOALS.calories);
  const [proteinEaten, setProteinEaten] = useState(HARDCODED_GOALS.protein);
  const [carbohydratesEaten, setCarbohydratesEaten] = useState(HARDCODED_GOALS.carbohydrates);
  const [fatEaten, setFatEaten] = useState(HARDCODED_GOALS.fat);
  const [thisMorning, setThisMorning] = useState(new Date(new Date().setHours(2, 0, 0, 0)));
  const [now, setNow] = useState(new Date());

  const [logout, { loading: logoutLoading, error: logoutError, data: logoutData, client: logoutClient }] = useMutation(LOGOUT);
  // const { loading, error, data, refetch } = useQuery(GET_FOOD_ENTRIES, { variables: { createdAt: new Date().valueOf() } });
  console.log(thisMorning);
  const { loading, error, data, client, refetch } = useQuery(GET_FOOD_ENTRIES, {
    variables: { from: thisMorning, to: now }
  });

  // useEffect(() => {
  // (async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== 'granted') {
  //     this.setState({
  //       errorMessage: 'Permission to access location was denied',
  //     });
  //   }

  //   let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
  //   const { latitude, longitude } = location.coords
  //   getGeocodeAsync({ latitude, longitude });
  //   setLocation({ latitude, longitude });
  //   console.log(geocode[0] ? geocode[0].city : 'no geocode');
  // })();
  // }, []);
  // const getGeocodeAsync = async (location) => {
  //   let geocode = await Location.reverseGeocodeAsync(location);
  //   setGeocode(geocode);
  // };


  const getMacros = (nutrition) => {
    macros.calories.push(nutrition.calories);
    macros.protein.push(nutrition.protein);
    macros.carbohydrates.push(nutrition.carbohydrates);
    macros.fat.push(nutrition.fat);
    setMacros(macros);
    calcMacros();
    // once last entry is pushed calculate macros
    // if (data.foodEntries.length === macros.calories.length) calcMacros();
  };

  const calcMacros = () => {
    let newCalories = 0;
    macros.calories.forEach(entry => newCalories += Number(entry));
    setCaloriesEaten(goals.calories - newCalories);

    let newProtein = 0;
    macros.protein.forEach(entry => newProtein += Number(entry));
    setProteinEaten(goals.protein - newProtein);

    let newCarbohydrates = 0;
    macros.carbohydrates.forEach(entry => newCarbohydrates += Number(entry));
    setCarbohydratesEaten(goals.carbohydrates - newCarbohydrates);

    let newFat = 0;
    macros.fat.forEach(entry => newFat += Number(entry));
    setFatEaten(goals.fat - newFat);
  };

  const handleLogout = () => {
    setDisplayScreen(false);
    logout()
      .then(({ data }) => {
        if (data.logout === 'logged out') {
          SecureStore.deleteItemAsync('userJWT')
            .then(() => { navigation.navigate('Auth') })
            .catch(err => console.log('err:', err.message || err));
        } else {
          throw new Error('failed to logout');
        }
      });
  };

  // console.log('navigation', navigation);
  if (navigation.state.params && navigation.state.params.refetch) {
    // refresh query and reload screen
    console.log('navigation.state.params.refetch exists', navigation.state.params);
    refetch().then(() => navigation.navigate('Dashboard'));
  }

  // console.log('client keys:', Object.keys(client));
  // console.log('client.cache:', Object.keys(client.cache));
  // const { foodEntries } = client.readQuery({
  //   query: gql`
  //     query FoodEntries {
  //       foodEntries {
  //         id
  //         item {
  //           id
  //           name
  //         }
  //       }
  //     }`,
  // });
  // console.log(foodEntries)
  // console.log(geocode ? geocode[0].city : 'null');

  if (!displayScreen) return <LoadingIndicator text='Logging out...' />;
  if (loading) return <LoadingIndicator />;
  return (
    <View style={styles.container}>
      <ErrorMessage error={error ? error : logoutError} />
      <NavigationEvents onDidFocus={() => refetch().then(() => navigation.navigate('Dashboard'))} />
      <View style={styles.bannerContainer}>
        <CaretLeftSVG style={styles.caretLeftSVG} color={'white'} onPress={() => console.log('left')} />
        <Text style={styles.bannerText}>Today</Text>
        {/* TODO - grey out caretRight logic */}
        <CaretRightSVG style={styles.caretLeftSVG} opacity={0.3} color={'white'} />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerLabelLeft}>Calories</Text>
        <Text style={styles.headerLabelRight}>Daily goal: {HARDCODED_GOALS.calories.toLocaleString()}</Text>
      </View>
      <View style={styles.caloriesRemainingContainer}>
        <Text style={styles.caloriesRemainingHeader}>{caloriesEaten}</Text>
        <Text style={styles.caloriesRemainingText}>Calories Remaining</Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerLabelLeft}>Macros</Text>
      </View>
      <View style={styles.macroContainer}>
        <MacroArc macros={{
          text: 'Protein',
          goal: goals.protein,
          actual: goals.protein - proteinEaten,
          color: '#cb4da2',
        }} />
        <MacroArc macros={{
          text: 'Carbs',
          goal: goals.carbohydrates,
          actual: goals.carbohydrates - carbohydratesEaten,
          color: '#7147d4',
        }} />
        <MacroArc macros={{
          text: 'Fat',
          goal: goals.fat,
          actual: goals.fat - fatEaten,
          color: '#89d7ef',
        }} />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerLabelLeft}>Food</Text>
        <Text style={styles.headerLabelRight}>{goals.calories - caloriesEaten}</Text>
      </View>
      {/* <View style={styles.mealsHeaderContainer}>
        <Text style={styles.mealsHeader}>Meals</Text>
        <Text style={styles.mealsCals}>Cals: {goals.calories - caloriesEaten}/{goals.calories}</Text>
      </View> */}
      <ScrollView style={styles.scrollViewContainer}>
        {/* TODO - fix, sometimes causes error */}
        {!data.foodEntries[0] ? (
          // {!data ? (
          <Text>No entries today</Text>
        ) : data.foodEntries.map((data, i) => (
          <MealEntry
            key={i}
            data={data}
            onPress={() => navigation.navigate('EditFoodScreen', { itemData: data, getMacros })}
            getMacros={getMacros}
          />
        ))}
      </ScrollView>
      {/* <View style={styles.footerFader}><Text>test</Text></View> */}
      <View style={styles.footerContainer}>
        {/* <ProfileSVG onPress={() => handleLogout()} /> */}
        <ProfileSVG onPress={() => navigation.navigate('Profile')} />
        <AddMealSVG onPress={() => navigation.navigate('AddFoodStack')} />
        <SettingsSVG onPress={() => console.log('TODO')} />
      </View>
    </View >
  );
};

export default withNavigation(Dashboard);
