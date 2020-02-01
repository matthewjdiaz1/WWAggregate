// // import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import ScanBarcodeScreen from '../screens/ScanBarcodeScreen';
import ItemNotFoundScreen from '../screens/ItemNotFoundScreen';


const RootStack = createStackNavigator(
  {
    ScanBarcode: ScanBarcodeScreen,
    ItemNotFound: ItemNotFoundScreen,
    ScanBarcode: ScanBarcodeScreen,
  },
  // {
  //   initialRouteName: 'ItemNotFound',
  // },
  {
    defaultNavigationOptions: {
      headerShown: false,
    }
    // defaultNavigationOptions: {
    //   header: null,
    // }
  },
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
