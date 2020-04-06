import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as SecureStore from 'expo-secure-store';

import ErrorMessage from '../../components/ErrorMessage';
import MacroArc from '../../components/MacroArc';
import Meal from '../../components/Meal';
import LoadingIndicator from '../../components/LoadingIndicator';
import SettingsSVG from '../../components/SVGs/SettingsSVG';
import AddMealSVG from '../../components/SVGs/AddMealSVG';
import ProfileSVG from '../../components/SVGs/ProfileSVG';
import styles from './styles';

const HARDCODED_DATA = {
  calories: 2387,
  protein: 150,
  carbohydrates: 330,
  fat: 53,
};

const GET_FOOD_ENTRIES = gql`
query FoodEntries($dayCreated: String){
  foodEntries(dayCreated: $dayCreated) {
    id
    userId
    itemId
    servingSize
    dayCreated
  }
}`;
const LOGOUT = gql`
mutation Logout{
  logout
}`;

const Dashboard = ({ navigation }) => {
  const [goals, setGoals] = useState(HARDCODED_DATA);
  const [macros, setMacros] = useState({
    calories: [],
    protein: [],
    carbohydrates: [],
    fat: [],
  });
  const [caloriesEaten, setCaloriesEaten] = useState(HARDCODED_DATA.calories);
  const [proteinEaten, setProteinEaten] = useState(HARDCODED_DATA.protein);
  const [carbohydratesEaten, setCarbohydratesEaten] = useState(HARDCODED_DATA.carbohydrates);
  const [fatEaten, setFatEaten] = useState(HARDCODED_DATA.fat);
  const [today, setToday] = useState(`${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`);

  const [logout, { loading: logoutLoading, error: logoutError, data: logoutData, client: logoutClient }] = useMutation(LOGOUT);
  const { loading, error, data } = useQuery(GET_FOOD_ENTRIES, {
    variables: { dayCreated: today },
  });

  const getMacros = (nutrition) => {
    macros.calories.push(nutrition.calories);
    macros.protein.push(nutrition.protein);
    macros.carbohydrates.push(nutrition.carbohydrates);
    macros.fat.push(nutrition.fat);
    setMacros(macros);
    calcMacros();
    // once last entry is pushed, calculate macros
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
    logout().then(({ data }) => {
      if (data.logout === 'logged out') {
        SecureStore.deleteItemAsync('userJWT')
          .then(() => { navigation.navigate('Auth') });
      } else {
        throw new Error('failed to logout');
      }
    });
  };

  if (loading) return <LoadingIndicator />;
  return (
    <View style={styles.container}>
      <ErrorMessage error={error ? error : logoutError} />
      {/* moment package to add comma to calories eaten */}
      <Text style={styles.header}>{caloriesEaten}</Text>
      <Text style={styles.headerText}>Calories Remaining</Text>
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
      <View style={styles.mealsHeaderContainer}>
        <Text style={styles.mealsHeader}>Meals</Text>
        <Text style={styles.mealsCals}>Cals: {goals.calories - caloriesEaten}/{goals.calories}</Text>
      </View>
      <ScrollView>
        {!data.foodEntries[0] ? (
          <Text>No entries today</Text>
        ) : data.foodEntries.map((entry, i) => (
          <Meal
            key={i}
            data={entry}
            getMacros={getMacros} />
        ))}
      </ScrollView>
      {/* <View style={styles.footerFader}><Text>test</Text></View> */}
      <View style={styles.footerContainer}>
        <ProfileSVG onPress={() => handleLogout()} />
        <AddMealSVG onPress={() => { navigation.navigate('Add') }} />
        <SettingsSVG onPress={() => { console.log('does not work') }} />
      </View>
    </View>
  );
};

export default withNavigation(Dashboard);
