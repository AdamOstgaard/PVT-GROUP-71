import { createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import WizardWelcomeScreen from "../screens/WizardWelcomeScreen";
import WizardVerifyContactScreen from "../screens/WizardVerifyContactScreen";
import WizardSettingsScreen from "../screens/WizardSettingsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ChangeContactScreen from "../screens/ChangeContactScreen";




export default createAppContainer(
  createSwitchNavigator({
    WizardWelcomeScreen: { screen: WizardWelcomeScreen },
    WizardVerifyContactScreen: { screen: WizardVerifyContactScreen },
    WizardSettingsScreen: { screen: WizardSettingsScreen },
    ChangeContactScreen: {screen: ChangeContactScreen},
    SettingsScreen: { screen: SettingsScreen },
    HomeScreen: { screen: HomeScreen }
  })
);