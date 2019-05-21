import React from "react";
import { Text, View, Button } from "react-native";
import { AsyncStorage } from "react-native";

export default class SleepTimerSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startHour: 0,
      startMinute: 0,
      endHour: 0,
      endMinute: 0
    };
  }

  storeSleepTime = async () => {
    let sleepTime = {
      startHour: this.state.startHour,
      startMinute: this.state.startMinute,
      endHour: this.state.endHour,
      endMinute: this.state.endMinute
    };
    try {
      await AsyncStorage.setItem("@SleepTime:key", JSON.stringify(sleepTime));
    } catch (error) {
      console.log("FEL hittar inte data");
    }
  };

  loadSleepTime = async () => {
    try {
      const value = await AsyncStorage.getItem("@SleepTime:key");
      savedSleepTime = JSON.parse(value);
      this.setState({
        startHour: savedSleepTime.startHour,
        startMinute: savedSleepTime.startMinute
      });
    } catch (e) {
      console.log("error");
    }
  };

  render() {
    return (
      <View>
        <Text>{this.state.endHour}</Text>
        <Button title="Spara några tider" onPress={this.storeSleepTime} />
        <Button title="Visa sparade tider" onPress={this.loadSleepTime} />
        <Text>
          Start: {this.state.startHour} , {this.state.startMinute}
        </Text>
      </View>
    );
  }
}
