import { createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import WizardWelcomeScreen from "../screens/WizardWelcomeScreen";
import WizardVerifyContactScreen from "../screens/WizardVerifyContactScreen";
import WizardSettingsScreen from "../screens/WizardSettingsScreen";
import SleepTimeSettingsScreen from "../screens/SleepTimeSettingsScreen";

export default createAppContainer(
  createSwitchNavigator({
    SleepTimeSettingsScreen: { screen: SleepTimeSettingsScreen },
    WizardWelcomeScreen: { screen: WizardWelcomeScreen },
    WizardVerifyContactScreen: { screen: WizardVerifyContactScreen },
    WizardSettingsScreen: { screen: WizardSettingsScreen },
    HomeScreen: { screen: HomeScreen }
  })
);