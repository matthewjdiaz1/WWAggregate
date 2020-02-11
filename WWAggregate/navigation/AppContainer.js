import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ScanBarcodeScreen from '../screens/ScanBarcodeScreen';
import DisplayProductScreen from '../screens/DisplayProductScreen';
import ItemNotFoundScreen from '../screens/ItemNotFoundScreen';
import ScanNutritionScreen from '../screens/ScanNutritionScreen';
import DisplayPic from '../components/DisplayPic';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoadingScreen from '../screens/LoadingScreen';

firebase.initializeApp(firebaseConfig);
// firebase.analytics(); // TODO investigate

const AuthStack = createStackNavigator({
  // Loading: LoadingScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
});

const AppStack = createStackNavigator(
  {
    // DelayedQuery: DelayedQuery,
    ScanBarcode: ScanBarcodeScreen,
    ItemNotFound: ItemNotFoundScreen,
    ScanNutrition: ScanNutritionScreen,
    DisplayProduct: DisplayProductScreen,
    DisplayPic: DisplayPic,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    }
  },
)

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      // Loading: LoadingScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'Auth',
    }
  )
);

export default AppContainer;
