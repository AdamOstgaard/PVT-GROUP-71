import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import SleepTimeSettingsScreen from '../screens/SleepTimeSettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import WizardWelcomeScreen from '../screens/WizardWelcomeScreen';
import WizardVerifyContactScreen from '../screens/WizardVerifyContactScreen';
import WizardSettingsScreen from '../screens/WizardSettingsScreen';


const AppStack = createStackNavigator({ Home: HomeScreen, Settings: SleepTimeSettingsScreen,  });
const WizardStack =  createStackNavigator({ WizardWelcome: WizardWelcomeScreen, WizardVerifyContact: WizardVerifyContactScreen, WizardSettings : WizardSettingsScreen, Home: HomeScreen, Settings: SleepTimeSettingsScreen})

export default createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    WizStack: WizardStack
  },
  {
    initialRouteName: 'WizStack',
  }
));

