import { createAppContainer, createSwitchNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import WizardWelcomeScreen from "../screens/WizardWelcomeScreen";
import WizardVerifyContactScreen from "../screens/WizardVerifyContactScreen";
import WizardSettingsScreen from "../screens/WizardSettingsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AddNewContactScreen from "../screens/AddNewConctactScreen";
import ChangeContactScreen from "../screens/ChangeContactScreen";
import RemoveContactScreen from "../screens/RemoveContactScreen";



export default createAppContainer(
  createSwitchNavigator({
    WizardWelcomeScreen: { screen: WizardWelcomeScreen },
    WizardVerifyContactScreen: { screen: WizardVerifyContactScreen },
    WizardSettingsScreen: { screen: WizardSettingsScreen },
    AddNewContactScreen: {screen: AddNewContactScreen},
    ChangeContactScreen: {screen: ChangeContactScreen},
    RemoveContactScreen: {screen: RemoveContactScreen},
    SettingsScreen: { screen: SettingsScreen },
    HomeScreen: { screen: HomeScreen }
  })
);