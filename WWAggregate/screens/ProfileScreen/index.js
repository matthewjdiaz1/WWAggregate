import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

import * as SecureStore from 'expo-secure-store';

import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import CaretLeftSVG from '../../components/SVGs/CaretLeftSVG';
import PinSVG from '../../components/SVGs/PinSVG';
import CalSVG from '../../components/SVGs/CalSVG';
import ScaleSVG from '../../components/SVGs/ScaleSVG';
import styles from './styles';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const HARDCODED_PROFILE_DATA = {
  location: 'San Francisco',
  name: 'Matthew Diaz',
  createdAt: new Date(),
  dob: '30', // TODO - format?
  weight: 138,
  calories: 2387,
  protein: 150,
  carbohydrates: 330,
  fat: 53,
};

const LOGOUT = gql`
mutation Logout{
  logout
}`;

const Profile = ({ navigation }) => {
  const [displayScreen, setDisplayScreen] = useState(true);
  const [goals, setGoals] = useState(HARDCODED_PROFILE_DATA);
  const [macros, setMacros] = useState({
    calories: [],
    protein: [],
    carbohydrates: [],
    fat: [],
  });
  const [caloriesEaten, setCaloriesEaten] = useState(HARDCODED_PROFILE_DATA.calories);
  const [proteinEaten, setProteinEaten] = useState(HARDCODED_PROFILE_DATA.protein);
  const [carbohydratesEaten, setCarbohydratesEaten] = useState(HARDCODED_PROFILE_DATA.carbohydrates);
  const [fatEaten, setFatEaten] = useState(HARDCODED_PROFILE_DATA.fat);

  const [logout, { loading, error, data, client }] = useMutation(LOGOUT);

  const handleLogout = () => {
    console.log('test');
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

  if (!displayScreen) return <LoadingIndicator text='Logging out...' />;
  if (loading) return <LoadingIndicator />;
  return (
    <View style={styles.container}>
      <ErrorMessage error={error} />
      <View style={styles.caretLeftContainer}>
        <CaretLeftSVG onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.profileAccountInfoContainer}>
        <Svg style={styles.profilePic} width='70' height='70' viewBox='-4 -4 69 69' fill='none'>
          <Circle cx='32.5' cy='32.5' r='32.5' fill='white' />
          <SvgText style={styles.profilePicText} onPress={() => console.log('add profile pic TODO')}>add pic</SvgText>
        </Svg>
        <View style={styles.profileNameContainer}>
          <Text style={styles.accountNameText}>{HARDCODED_PROFILE_DATA.name}</Text>
          <Text style={styles.accountJoinedText}>Joined {MONTHS[HARDCODED_PROFILE_DATA.createdAt.getMonth()]} {HARDCODED_PROFILE_DATA.createdAt.getFullYear()}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => handleLogout()}>
        <View style={styles.editProfileButtonContainer}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.userStatsContainer}>
        <View style={styles.userStatsPair}>
          <PinSVG />
          <Text style={styles.userStatsText}>{HARDCODED_PROFILE_DATA.location}</Text>
        </View>
        <View style={styles.userStatsPair}>
          <CalSVG />
          <Text style={styles.userStatsText}>{HARDCODED_PROFILE_DATA.dob} years old</Text>
        </View>
        <View style={styles.userStatsPair}>
          <ScaleSVG />
          <Text style={styles.userStatsText}>{HARDCODED_PROFILE_DATA.weight}lbs</Text>
        </View>
      </View>
    </View >
  );
};

export default withNavigation(Profile);
