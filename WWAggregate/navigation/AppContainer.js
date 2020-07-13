import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Profile from '../screens/ProfileScreen';
import Dashboard from '../screens/Dashboard';
import EditFoodScreen from '../screens/EditFoodScreen';
import ScanBarcodeScreen from '../screens/ScanBarcodeScreen';
import AddFoodScreen from '../screens/AddFoodScreen';
import ScanNutritionScreen from '../screens/ScanNutritionScreen';

import DisplayItemScreen from '../screens/DisplayItemScreen';
import DisplayPic from '../components/DisplayPic';
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
    Profile,
    Dashboard,
    EditFoodScreen,
  },
  {
    initialRouteName: 'Dashboard',
    defaultNavigationOptions: { headerShown: false },
  },
);
const AddFoodStack = createStackNavigator(
  {
    AddFood: AddFoodScreen,
    ScanBarcode: ScanBarcodeScreen,
    ScanNutrition: ScanNutritionScreen,
    DisplayItem: DisplayItemScreen,
  },
  {
    defaultNavigationOptions: { headerShown: false }
  },
);


const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      Home: HomeStack,
      AddFoodStack: AddFoodStack,
    },
    {
      initialRouteName: 'Auth',
    },
  )
);

export default AppContainer;
