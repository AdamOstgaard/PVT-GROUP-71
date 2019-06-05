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
    this.onPickedValues = this.onPickedStartTime.bind(this);
    this.onPickedValues = this.onPickedEndTime.bind(this);

  }

  static navigationOptions = {
    header: null
  };

  toMilliseconds = (h, m) =>
    moment.duration(h, "h").asMilliseconds() +
    moment.duration(m, "m").asMilliseconds();

  async saveSettings(sleepTime) {
    try {
      await AsyncStorage.setItem("sleeptime", JSON.stringify(sleepTime));
    } catch (error) {}
  }

  onPickedStartTime = (hours, minutes) => {
    this.setState({
      startHour: hours,
      startMinute: minutes
    })
  }

  onPickedEndTime = (hours, minutes) => {
    this.setState({
      endHour: hours,
      endMinute: minutes
    })
  }

  handleSave() {
    const sleepTime = {
      startTime: this.toMilliseconds(
        this.state.startHour,
        this.state.startMinute
      ),
      endTime: this.toMilliseconds(this.state.endHour, this.state.endMinute)
    };
    this.saveSettings(sleepTime);
    this.props.navigation.navigate("SettingsScreen");
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
          onChange={this.onPickedStartTime}
        />
        <TimePicker
          selectedHours={this.state.endHour}
          selectedMinutes={this.state.endMinute}
          onChange={this.onPickedEndTime}
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
        <View style={styles.boxContainerBottom}>
          <View style={styles.bottom}>
            <AppSingleButton
              style={styles.leftButton}
              textStyle={styles.buttonLText}
              title="Avbryt"
              onPress={() => this.props.navigation.navigate("SettingsScreen")}
            />
            <AppSingleButton
              style={styles.rightButton}
              textStyle={styles.buttonText}
              title="Spara"
              onPress={this.handleSave}
            />
          </View>
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
    justifyContent: "flex-start",
    left: 10,
    marginTop: 50
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
    position: "absolute",
    bottom: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  boxContainerBottom: {
    flex: 2
  },
  leftButton: {
    width:"50%",
    backgroundColor: 'grey'
  },
  rightButton: {
    width:"50%",
  },
  buttonText: {
    textAlign: "right"
  },
  buttonLText: {
    textAlign: "left"
  }
});
