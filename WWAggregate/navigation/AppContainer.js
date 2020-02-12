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
import HomeScreen from '../screens/HomeScreen';

firebase.initializeApp(firebaseConfig);
// firebase.analytics(); // TODO - investigate

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    }
  },
);
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
)
const ScanBarcodeStack = createStackNavigator(
  {
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
      Loading: LoadingScreen,
      Auth: AuthStack,
      App: HomeStack,
      ScanBarcode: ScanBarcodeStack,
    },
    {
      initialRouteName: 'Loading',
    },
  )
);

export default AppContainer;
