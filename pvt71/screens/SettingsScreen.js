import React from "react";
import { Text, View, StyleSheet } from "react-native";
import TimePicker from "react-native-simple-time-picker";
import AppSingleButton from "../components/AppSingleButton";
import { AsyncStorage } from "react-native";
import moment from "moment";

export default class SettingsScreen extends React.Component {
  state = {
    startHour: 0,
    startMinute: 0,
    endHour: 0,
    endMinute: 0
  };

  static navigationOptions = {
    header: null
  };

  toMilliseconds = (h, m) =>
    moment.duration(h, "h").asMilliseconds() +
    moment.duration(m, "m").asMilliseconds();

  async saveSettings(sleepTime) {
    try {
      await AsyncStorage.setItem("sleeptime", JSON.stringify(sleepTime));
    } catch (error) {
      console.log("kunde inte spara data");
    }
  }

  handleSave = () => {
    const sleepTime = this.toMilliseconds(
      this.state.startHour,
      this.state.startMinute,
      this.state.endHour,
      this.state.endMinute
    );
    this.saveSettings(sleepTime);
    this.props.navigation.navigate("HomeScreen", { sleepTime });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Sömntider</Text>
        <Text style={styles.infoText}>
          Under dessa tider kommer du ej behöva verifiera ditt välmående
        </Text>
        <Text style={styles.infoText}>Starttid: {this.state.startHour} </Text>
        <TimePicker
          selectedHours={this.state.startHour}
          selectedMinutes={this.state.startMinute}
          onChange={(hours, minutes) =>
            this.setState({
              startHour: hours,
              startMinute: minutes
            })
          }
        />
        <Text style={styles.infoText}>Sluttid</Text>
        <TimePicker
          selectedHours={this.state.endHour}
          selectedMinutes={this.state.endMinute}
          onChange={(hours, minutes) =>
            this.setState({
              endHour: hours,
              endMinute: minutes
            })
          }
        />
        <View style={styles.bottom}>
          <AppSingleButton title="Nästa" onPress={this.handleSave} />
        </View>
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
    //flex: 1,
    justifyContent: "flex-start",
    left: 10,
    marginTop: 50
    //backgroundColor: "blue"
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
