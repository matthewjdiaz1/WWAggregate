import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import LoadingIndicator from '../../components/LoadingIndicator';
import BarcodeSVG from '../../components/SVGs/BarcodeSVG';
import CaretLeftSVG from '../../components/SVGs/CaretLeftSVG';
import SearchIconSVG from '../../components/SVGs/SearchIconSVG';
import styles from './styles';

/**
 * from here we need to find a quick, easy, and intuitive way to add item meals for today.
 * eveytime i have a pb&j i don't want to have to scan 3 barcodes.
 * i don't want to have to search for three items, either. (peanut butter, jelly, bread)
 * i need some type of meal system to add previous meals i've had (group items together)
 * 
 * perhaps when we scan a barcode, it adds it to our "pantry", or items that we often use(or have ever used)
 * we can create meals or recipies from multiple items.
 * 
 * //////////////////////////// SYSTEM DESIGN QUESTIONS ////////////////////////////
 * TABLE EVERYTHING OUT => USER, GOALS(MACROS, WEIGHT), ITEMS, FOODENTRIES, EVEERYYYYTHING
 * HOW DO YOU WANT THEM TO BE SEARCHED?
 * USER IS ALWAYS KNOW, SO HOW DO YOU WANT TO SEARCH FOR ITEMS, FOOD ENTRIES, NUTRITION => CALORIES
 * SEARCHING => BE MINDFUL OF DEBOUNCING AND WILDCARD SHIT
 * ////////////////////////////////////////////////////////////////////////////////
 */

const GET_ENTRIES = gql`
query AllEntries ($itemName: String) {
  foodEntries (itemName: $itemName) {
    id
    servingSize
    updatedAt
    item {
      id
      name
      nutrition {
        calories
        protein
        fat
        carbohydrates
      }
    }
  }
}`;

const AddFoodScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [resultsHeader, setResultsHeader] = useState('History');
  const [debounceInterval, setDebounceInterval] = useState(null);

  const { loading, error, data, refetch } = useQuery(GET_ENTRIES);

  const handleTextChange = text => {
    if (debounceInterval) setDebounceInterval(clearInterval(debounceInterval));
    if (text !== '') {
      setDebounceInterval(setTimeout(() => {
        refetch({ itemName: text })
          .then(data => console.log(data))
          .catch(err => console.log('err', err.message || err));
      }, 500));
    } else {
      setDebounceInterval(setTimeout(() => {
        refetch()
          .then(data => console.log('empty search data', data))
          .catch(err => console.log('err', err.message || err));
        // setResultsHeader('History');
      }, 500));
    }
    setResultsHeader('Results');
    setSearch(text);
  };

  const handleSearchSubmit = text => {
    console.log('search submit');
    if (debounceInterval) setDebounceInterval(clearInterval(debounceInterval));
    // setResultsHeader('Results');
    // refetch({ itemName: text });
    // setSearch(text);
  };

  // if (error) return <View style={styles.container}><Text>{error.message}</Text></View>;
  if (error) console.log('addFoodScreen error', error.message || error);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CaretLeftSVG onPress={() => navigation.navigate('Home')} />
        <Text style={styles.headerText}>Add Food</Text>
        <BarcodeSVG onPress={() => navigation.navigate('ScanBarcode')} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchIcon}>
          <SearchIconSVG />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Search for a food"
          autoCapitalize={'words'}
          onChangeText={(text) => handleTextChange(text)}
          // onSubmitEditing={(text) => handleSearchSubmit(text)} // submit
          value={search} />
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsHeader}>{resultsHeader}</Text>
        <ScrollView
          style={styles.scrollView}
          contentOffset={{ x: 0, y: .3 }}>
          {data ? data.foodEntries.map((entry, i) => (
            <View key={i}>
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{entry.itemName || entry.item.name}</Text>
                <Text style={styles.itemText}>{entry.item.nutrition.calories}</Text>
              </View>
              <Text style={styles.itemServing}>{entry.servingSize}{entry.servingUnit}</Text>
            </View>
          )) : (
              <View>
                <View style={styles.itemContainer}>
                  <LoadingIndicator text='Loading meal history...' />
                </View>
              </View>
            )}
          <View style={{ height: 35 }} />
        </ScrollView>
      </View>
      <LinearGradient
        style={styles.footerContainer}
        start={[0, 0]}
        end={[0, .85]}
        colors={['rgba(255, 255, 255, 0)', '#FFFFFF']} />
    </View>
  );
};

export default withNavigation(AddFoodScreen);
