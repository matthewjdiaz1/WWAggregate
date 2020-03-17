import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import LoadingIndicator from '../LoadingIndicator';
import styles from './styles';

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

const Meal = (props) => {
  const { loading, data, error } = useQuery(GET_ITEM_NUTRITION, {
    variables: { itemId: props.data.itemId },
  });

  useEffect(() => {
    const onCompleted = (data) => { props.getMacros(data.nutrition) };
    const onError = (error) => { console.log(`meal useEffect error:`, error.message) };
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data);
      } else if (onError && !loading && error) {
        onError(error);
      }
    }
  }, [loading, data, error]);


  if (loading) return <View />;
  // if (loading) { props.key !== 0 ? <View></View> : <LoadingIndicator /> }
  // if (loading) return <LoadingIndicator />;
  if (error) return <View><Text>{error.message}</Text></View>;

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>{data.item.name}</Text>
        <Text style={styles.text}>{data.nutrition.calories}</Text>
      </View>
      <View style={styles.macrosContainer}>
        <Text style={styles.macros}>protein {data.nutrition.protein || 0}g</Text>
        <Text style={styles.macros}>fat {data.nutrition.fat || 0}g</Text>
        <Text style={styles.macros}>carbs {data.nutrition.carbohydrates || 0}g</Text>
      </View>
    </View>
  );
};

export default Meal;
