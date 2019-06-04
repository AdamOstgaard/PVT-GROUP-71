import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppSingleButton from "../components/AppSingleButton";
import TimePicker from "react-native-simple-time-picker";
import { AsyncStorage } from "react-native";
import moment from "moment";
import { getDurationSettings } from '../utils/Settings'
import "moment-duration-format";


export default class TimerSettingsScreen extends React.Component {
  state = {
    selectedHours: -1,
    selectedMinutes: -1
  };

  static navigationOptions = {
    header: null
  };


  async componentDidMount() {
    let s = await getDurationSettings();
    let h = parseInt(moment.duration(s.duration).format("h"));
    let m = parseInt(moment.duration(s.duration).format("mm"));
    m -= h*60;
    this.setState({
      selectedHours: h,
      selectedMinutes: m
    });
  }

  render() {
    const { selectedHours, selectedMinutes } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.header}>Timerinställningar</Text>
          <Text style={styles.infoText}>
            Här kan du ändra hur ofta du vill verifiera ditt välmående
          </Text>
        </View>
        <View style={styles.boxContainerPicker}>
        <View style={styles.boxContainerRow}>
          <Text style={styles.picker}>Timmar</Text>
          <Text style={styles.picker}>Minuter</Text>
        </View>
          <TimePicker
            selectedHours={this.state.selectedHours}
            selectedMinutes={this.state.selectedMinutes}
            onChange={(hours, minutes) =>
              this.setState({
                selectedHours: hours,
                selectedMinutes: minutes
              })
            }
          />
        </View>
        <View style={styles.boxContainerBottom}>
          <View style={styles.bottom}>
            <AppSingleButton
              style ={styles.bottomLeft}
              textStyle = {styles.leftText}
              title="Avbryt"
              onPress={() => this.props.navigation.navigate("HomeScreen")}
            />
            <AppSingleButton
              style ={styles.bottomRight}
              textStyle ={styles.rightText}
              title="Spara"
              onPress={() => {
                const duration = this.toMilliseconds(
                  this.state.selectedHours,
                  this.state.selectedMinutes
                );
                this.saveSettings(duration);
                this.props.navigation.navigate("HomeScreen");
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  toMilliseconds = (h, m) =>
    moment.duration(h, "h").asMilliseconds() +
    moment.duration(m, "m").asMilliseconds();

  async saveSettings(time) {
    try {
      await AsyncStorage.setItem("time", JSON.stringify(time));
    } catch (error) {
      // Error saving data
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'space-between',
  },
  boxContainer: {},
  boxContainerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  boxContainerPicker: {
    alignItems: "flex-end",
    //marginBottom: "0%",
    flex: 1,
  },
  header: {
    fontSize: 30,
    left: 10,
    marginTop: "10%",
    marginBottom: "0%"
  },
  infoText: {
    fontSize: 20,
    marginTop: "0%",
    paddingLeft: 10,
    paddingRight: 20,
    paddingBottom: "20%"
  },
  picker: {
    flex: 1,
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 10,
    textAlign: "left",
    bottom: 0
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  bottomLeft:{
    width: "50%",
    textAlign: "left",
    backgroundColor: '#a9a9a9'
  },
  leftText:{
    textAlign: "left"
  },
  bottomRight:{
    width: "50%",
    alignItems: "flex-end"
  },
  rightText: {
    textAlign: "right"
  }
});
