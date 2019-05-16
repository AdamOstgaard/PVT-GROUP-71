import React from "react";
import { Text, View, Button } from "react-native";
import SleepTimeSettings from "../components/SleepTimeSettings";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "app.json"
  };

  render() {
    return (
      <View>
        <SleepTimeSettings />
      </View>
    );
  }
}
