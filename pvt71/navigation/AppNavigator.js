import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import SleepTimeSettingsScreen from '../screens/SleepTimeSettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import WizardWelcomeScreen from '../screens/WizardWelcomeScreen';
import WizardVerifyContactScreen from '../screens/WizardVerifyContactScreen';
import WizardSettingsScreen from '../screens/WizardSettingsScreen';


const AppStack = createStackNavigator({ HomeScreen: HomeScreen, SleepTimeSettingsScreen: SleepTimeSettingsScreen,  });
const WizardStack =  createStackNavigator({ WizardWelcomeScreen: WizardWelcomeScreen, WizardVerifyContactScreen: WizardVerifyContactScreen, WizardSettingsScreen : WizardSettingsScreen, HomeScreen: HomeScreen, SleepTimeSettingsScreen: SleepTimeSettingsScreen, TimerSettingsScreen: TimerSettingsScreen, HelpScreen: HelpScreen})

export default createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    WizStack: WizardStack
  },
  {
    initialRouteName: 'WizStack',
  }
));

