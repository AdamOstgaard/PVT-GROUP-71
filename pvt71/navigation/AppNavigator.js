import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import SleepTimeSettingsScreen from "../screens/SleepTimeSettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import WizardWelcomeScreen from "../screens/WizardWelcomeScreen";
import WizardVerifyContactScreen from "../screens/WizardVerifyContactScreen";
import WizardSettingsScreen from "../screens/WizardSettingsScreen";
import TimerSettingsScreen from "../screens/TimerSettingsScreen";
import HelpScreen from "../screens/HelpScreen";
import SettingsScreen from "../screens/SettingsScreen";

const AppStack = createStackNavigator({
  HomeScreen: HomeScreen,
  SleepTimeSettingsScreen: SleepTimeSettingsScreen
});
const WizardStack = createStackNavigator({
  WizardWelcomeScreen: WizardWelcomeScreen,
  WizardVerifyContactScreen: WizardVerifyContactScreen,
  WizardSettingsScreen: WizardSettingsScreen,
  HomeScreen: HomeScreen,
  SleepTimeSettingsScreen: SleepTimeSettingsScreen,
  TimerSettingsScreen: TimerSettingsScreen,
  HelpScreen: HelpScreen,
  SettingsScreen: SettingsScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      WizStack: WizardStack
    },
    {
      initialRouteName: "WizStack"
    }
  )
);
