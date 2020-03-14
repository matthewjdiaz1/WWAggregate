import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Meal from '../../components/Meal';
import LoadingIndicator from '../../components/LoadingIndicator';
import SettingsSVG from '../../components/SVGs/settings';
import AddMealSVG from '../../components/SVGs/addMeal';
import ProfileSVG from '../../components/SVGs/profile';
import styles from './styles';

const HARDCODED_DATA = {
  // calories: 2397,
  calories: 2400,
  protein: 150,
  carbohydrates: 330,
  fat: 53,
};

const AUTH_DATA = {
  userId: 420,
};

const GET_FOOD_ENTRIES = gql`
query FoodEntries($userId: Int, $dayCreated: String){
  foodEntries(userId: $userId, dayCreated: $dayCreated) {
    id
    userId
    itemId
    servingSize
    dayCreated
  }
}`;

const Dashboard = ({ navigation }) => {
  // get all of signed in users mealEntries from todays date
  const [userId, setUserId] = useState(AUTH_DATA.userId);
  const [goals, setGoals] = useState(HARDCODED_DATA);
  const [macros, setMacros] = useState({
    calories: [],
    protein: [],
    carbohydrates: [],
    fat: [],
  });
  const [cals, setCals] = useState(HARDCODED_DATA.calories);
  const [today, setToday] = useState(`${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`);

  const { loading, error, data } = useQuery(GET_FOOD_ENTRIES, {
    variables: { userId, dayCreated: today },
  });

  useEffect(() => { }, []);

  const getMacros = (nutrition) => {
    macros.calories.push(nutrition.calories);
    macros.carbohydrates.push(nutrition.carbohydrates);
    macros.fat.push(nutrition.fat);
    macros.protein.push(nutrition.protein);
    setMacros(macros);
    console.log('macros -- ', macros);
    // console.log('newMacros -- ', newMacros);

    // count data.foodEntries[0] entries, if === calorie.length setmacros, nice
    console.log(data.foodEntries.length);
    console.log(macros.calories.length);
    if (data.foodEntries.length === macros.calories.length) calcMacros();
  };
  const calcMacros = () => {
    // console.log('rerender macros', macros);
    console.log(goals.calories);
    console.log(macros.calories);
    let newCals = 0;
    macros.calories.forEach(entry => newCals += Number(entry));
    console.log(newCals);
    setCals(goals.calories - newCals);
  };

  if (loading) return <LoadingIndicator />;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{cals}</Text>
      <Text style={styles.headerText}>Calories Remaining</Text>
      <View style={styles.macroContainer}>
        <Text style={styles.macroText}>protein: {goals.protein}</Text>
        <Text style={styles.macroText}>carbs: {goals.carbohydrates}</Text>
        <Text style={styles.macroText}>fat: {goals.fat}</Text>
      </View>
      <View style={styles.mealsHeaderContainer}>
        <Text style={styles.mealsHeader}>Meals</Text>
        <Text style={styles.mealsCals}>800</Text>
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
        <ProfileSVG />
        <AddMealSVG />
        <SettingsSVG />
      </View>
    </View>
  );
};

export default withNavigation(Dashboard);
