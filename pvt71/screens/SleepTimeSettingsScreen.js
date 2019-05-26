import React from "react";
import { Text, View, StyleSheet } from "react-native";
import TimePicker from "react-native-simple-time-picker";
import AppSingleButton from "../components/AppSingleButton";
import { AsyncStorage } from "react-native";
import moment from "moment";

export default class SleepTimeSettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startHour: 0,
      startMinute: 0,
      endHour: 0,
      endMinute: 0
    };
    this.handleSave = this.handleSave.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  toMilliseconds = (h, m) =>
    moment.duration(h, "h").asMilliseconds() +
    moment.duration(m, "m").asMilliseconds();

  async saveSettings(sleepTime) {
    try {
      await AsyncStorage.setItem("sleeptime", JSON.stringify(sleepTime));
      console.log(JSON.stringify(sleepTime));
    } catch (error) {
      console.log("data is not saved");
    }
  }

  handleSave() {
    const sleepTime = {
      startTime: this.toMilliseconds(this.state.startHour, this.state.startMinute),
      endTime: this.toMilliseconds(this.state.endHour, this.state.endMinute)
    }
    this.saveSettings(sleepTime);
    this.props.navigation.navigate("Home");
  }

  formatTime = time => {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Sömntider</Text>
        <Text style={styles.infoText}>
          Under dessa tider kommer du ej behöva verifiera ditt välmående
        </Text>

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
        <View>
          <Text style={styles.endText}>
            Larmet kommer att vara avstängt från klockan:{" "}
            {this.formatTime(this.state.startHour)} :{" "}
            {this.formatTime(this.state.startMinute)} till{" "}
            {this.formatTime(this.state.endHour)} :{" "}
            {this.formatTime(this.state.endMinute)}
          </Text>
        </View>
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
  endText: {
    fontSize: 20,
    paddingLeft: 10
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end"
  }
});
