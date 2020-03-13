import React, { useState } from 'react';
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
  const { loading, error, data } = useQuery(GET_ITEM_NUTRITION, {
    variables: { itemId: props.data.itemId },
  });

  if (loading) return <View />;
  // if (loading) return <LoadingIndicator />;
  if (error) return <View><Text>{error.message}</Text></View>;
  if (!loading && !error) props.getMacros(data.nutrition);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data.item.name}</Text>
      <Text style={styles.text}>{data.nutrition.calories}</Text>
    </View>
  );
};

export default Meal;
