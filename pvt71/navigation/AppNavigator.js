import { createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import WizardWelcomeScreen from "../screens/WizardWelcomeScreen";
import WizardVerifyContactScreen from "../screens/WizardVerifyContactScreen";
import WizardSettingsScreen from "../screens/WizardSettingsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TimerSettingsScreen from "../screens/TimerSettingsScreen";
import HelpScreen from "../screens/HelpScreen";

export default createAppContainer(
  createSwitchNavigator({
    WizardWelcomeScreen: { screen: WizardWelcomeScreen },
    WizardVerifyContactScreen: { screen: WizardVerifyContactScreen },
    WizardSettingsScreen: { screen: WizardSettingsScreen },
    SettingsScreen: { screen: SettingsScreen },
    TimerSettingsScreen: {screen: TimerSettingsScreen},
    HomeScreen: { screen: HomeScreen },
    HelpScreen: { screen: HelpScreen}
  })
);