import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ScanBarcodeScreen from '../screens/ScanBarcodeScreen';
import DisplayProductScreen from '../screens/DisplayProductScreen';
import ItemNotFoundScreen from '../screens/ItemNotFoundScreen';
import ScanNutritionScreen from '../screens/ScanNutritionScreen';
import DisplayPic from '../components/DisplayPic';
// import HomeScreen from '../screens/HomeScreen';

// import GetBarcode from '../components/queries/GetBarcode';

const RootStack = createStackNavigator(
  {
    // DelayedQuery: DelayedQuery,
    // HomeScreen: HomeScreen,
    ScanBarcode: ScanBarcodeScreen,
    ItemNotFound: ItemNotFoundScreen,
    ScanNutrition: ScanNutritionScreen,
    DisplayProduct: DisplayProductScreen,
    DisplayPic: DisplayPic,
  },
  // {
  //   initialRouteName: 'ItemNotFound',
  // },
  {
    defaultNavigationOptions: {
      headerShown: false,
    }
  },
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
