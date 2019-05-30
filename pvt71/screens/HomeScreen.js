import React from "react";
import { StyleSheet, View, Alert, Text, AsyncStorage } from "react-native";
import { Timer } from "../components/Timer";
import TimerSleepButton from "../components/TimerSleepButton";
import moment from "moment";
import { playSound } from "../SoundPlayer";
import AppSingleButton from "../components/AppSingleButton";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { smsSender } from '../utils/SmsSender';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSleep: true,
      timerPaused: false,
      focused: false,
      duration: moment.duration(1, "h").asMilliseconds(),
    };
   this.toggleSleepMode = this.toggleSleepMode.bind(this);
  }
  static navigationOptions = {
    header: null
  };
  toggleSleepMode = value =>{
    this.setState({timerPaused: value})
  }

  componentDidMount() {
    if (!this.props.navigation) {
      return;
    }

    this.subs = [
      this.props.navigation.addListener("didFocus", payload =>{
        this.setState({focused: !this.state.focused})}
      )
    ];
  }

  toMilliseconds = (h, m) =>
    moment.duration(h, "h").asMilliseconds() +
    moment.duration(m, "m").asMilliseconds();


  componentWillUnmount() {
    this.focusListener.remove();
  }

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
            onTimerSleep={this.toggleSleepMode}
            onReset={reset => {
              this.setState({ timerPaused: reset });
            }}
            paused={this.state.timerPaused}
            style={styles.timer}
            startTime={this.state.duration}
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
      const d = JSON.parse(duration);
      this.setState({ duration: d });
    } catch (error) {}
  }
}


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
  topButton: {
    paddingTop: "10%"
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
