import React from "react";
import { StyleSheet, View, Alert, Text, AsyncStorage } from "react-native";
import { Timer } from "../components/Timer";
import TimerSleepButton from "../components/TimerSleepButton";
import moment from "moment";
import AppSingleButton from "../components/AppSingleButton";
import { playSound } from "../SoundPlayer";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { smsSender } from '../utils/SmsSender';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: moment.duration(1, "h").asMilliseconds(),
      warningTime: moment.duration(30, "m").asMilliseconds(),
      timerPaused: false
    };
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    if(!this.props.navigation){
      return;
    }

    this.subs = [
      this.props.navigation.addListener("didFocus", payload =>
        this.getSettings()
        )
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }
  render() {
    let pauseText;
    if (this.state.timerPaused) {
      pauseText = "VILOLÄGET ÄR PÅ";
    } else {
      pauseText = "VILOLÄGET ÄR AV";
    }
    return (
      <View style={styles.container}>
        <View style ={styles.topContainer}>

        <AppSingleButton
          style={styles.topButton}
          textStyle={styles.topTextStyle}
          title="Hjälp"
            onPress={() =>
              this.props.navigation.navigate("HelpScreen",{})}
          >
          </AppSingleButton>

          <View style ={styles.topButton1}>
          <AppSingleButton
          style={styles.topButton}
          textStyle={styles.topTextStyle}
          title="Inställningar"
            onPress={() =>
              this.props.navigation.navigate("SettingsScreen",{})}
          >
          </AppSingleButton>
          </View>

        </View>

        <View style={styles.timerContainer}>
        <Text style={styles.sleepOnText}>{pauseText}</Text>
          <Timer
            onReset={reset => {
              this.setState({ timerPaused: reset });
            }}
            paused={this.state.timerPaused}
            style={styles.timer}
            startTime={this.state.duration}
            warningTime={this.state.warningTime}
            warningCallback={warning => {
              playSound();
              showWarningAlert(warning);
            }}
            callback={restart => {
              playSound();
              showRestartAlert(restart);
            }}
          />
          <View style={styles.sleepButtonContainer}>
          <TimerSleepButton
            onResume={this.state.timerPaused}
            onToggle={enabled => this.setState({ timerPaused: enabled })}
          />
        </View>
        </View>

      </View>
    );
  }

  async getSettings() {
    try {
      const duration = await AsyncStorage.getItem("time") || moment.duration(1, "h").asMilliseconds();
      const warning = await AsyncStorage.getItem("warning") || moment.duration(1, "h").asMilliseconds();
      const d = JSON.parse(duration);
      const w = JSON.parse(warning);
      this.setState({ duration: d, warningTime: w});
    } catch (error) {}
  }
}

const showWarningAlert = warning => {
  Alert.alert(
    "Timer",
    "Are you ok?",
    [
      { text: "Yes, I'm Ok", onPress: () => warning() },
      {
        text: "No, I need help!",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      }
    ],
    { cancelable: false }
  );
};
const showRestartAlert = restart => {
  Alert.alert(
    "Timer",
    "Are you ok?",
    [
      { text: "Yes, I'm Ok", onPress: () => restart() },
      {
        text: "No, I need help!",
        onPress: () => smsSender.contactEmergencyContact(),
        style: "cancel"
      }
    ],
    { cancelable: false }
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight(),
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",

  },
  topContainer: {
    alignItems: "center",
    textAlign: "left",
    flex: 3,
  },
  topButton1: {
    paddingTop: 1,
    width:"100%",
  },
  topButton: {
    width:"100%",
    textAlign: "left",
    paddingLeft: 10,
  },
  topContainer: {
    paddingTop: "10%",
    alignItems: "center",
    textAlign: "left",
  },
  timerContainer: {
    alignItems: "center",
    flex:6
  },
  sleepButtonContainer: {
    alignItems:"flex-end"
    //left: 240
  },
  sleepOnText: {
    //marginTop: "30%",
    alignSelf: "center",
    fontSize: 18
  },
  topTextStyle: {
    textAlign: 'left',
  }
});
