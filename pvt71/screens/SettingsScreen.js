import React from "react";
import {StyleSheet, Text, View, PickerIOS } from 'react-native';
import BottomButton from "../components/BottomButton";
import TimerSettingsScreen from "../screens/TimerSettingsScreen";

export default class SettingScreen extends React.Component {
  constructor(){
    super()
    this.state ={}
  }
 
  render() {
    return (
      <View> 
        <Text>Hello </Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 35,
    flex: 1,
    justifyContent: "flex-start",
    left: 10,
    marginTop: 50
  },
  infoText: {
    fontSize: 20,
    marginBottom: 50,
    paddingLeft: 10
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end"
  }
});
