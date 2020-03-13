import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ScanBarcodeScreen from '../screens/ScanBarcodeScreen';
import DisplayItemScreen from '../screens/DisplayItemScreen';
import ItemNotFoundScreen from '../screens/ItemNotFoundScreen';
import ScanNutritionScreen from '../screens/ScanNutritionScreen';
import DisplayPic from '../components/DisplayPic';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Dashboard from '../screens/Dashboard';

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  },
  {
    defaultNavigationOptions: { headerShown: false }
  },
);
const HomeStack = createStackNavigator(
  {
    Home: Dashboard,
  },
  {
    defaultNavigationOptions: { headerShown: false }
  },
);
const ScanBarcodeStack = createStackNavigator(
  {
    // ScanBarcode: ScanBarcodeScreen,
    // ItemNotFound: ItemNotFoundScreen,
    ScanNutrition: ScanNutritionScreen,
    // DisplayItem: DisplayItemScreen,
    // DisplayPic: DisplayPic,
  },
  {
    defaultNavigationOptions: { headerShown: false }
  },
);


const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: HomeStack,
      ScanBarcode: ScanBarcodeStack,
    },
    {
      // initialRouteName: 'ScanBarcode',
      initialRouteName: 'App',
    },
  )
);

export default AppContainer;
