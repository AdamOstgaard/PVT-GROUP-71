import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import SleepTimerSettings from "../components/SleepTimerSettings";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "app.json"
  };

  render() {
    return (
      <View>
        <SleepTimerSettings />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
