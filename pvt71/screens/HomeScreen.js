import React from "react";
import { StyleSheet, View, Alert, Text, AsyncStorage } from "react-native";
import { Timer } from "../components/Timer";
import TimerSleepButton from "../components/TimerSleepButton";
import moment from "moment";
import AppSingleButton from "../components/AppSingleButton";
import { playSound } from "../SoundPlayer";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { smsSender } from '../utils/SmsSender';
import { getDurationSettings, getSleepTimeSettings } from '../utils/Settings'


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSleep: true,
      timerPaused: false,
      focused: false,
      times: {
        duration: moment.duration(11, "m").asMilliseconds(),
        warningTime: moment.duration(10, "m").asMilliseconds(),
      },
      sleepSettings: null,
      timerPaused: false
    };
    this.toggleSleepMode = this.toggleSleepMode.bind(this);
    this.update();
  }

  static navigationOptions = {
    header: null
  };

  async update(){
    let t = await getDurationSettings();
    this.setState({
      times: t,
    })
  }


  toggleSleepMode = value => {
    this.setState({ timerPaused: value })
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  componentDidMount() {
    if (!this.props.navigation) {
      return;
    }

    this.subs = [
      this.props.navigation.addListener("didFocus", payload => {
        Promise.all([getDurationSettings(), getSleepTimeSettings()]).then(values => {
          let [times, sleepSettings] = values;
          this.setState({
            times: times,
            sleepSettings: sleepSettings,
          })
        });
      }
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
        <View style={styles.topContainer}>

          <AppSingleButton
            style={styles.topButton}
            textStyle={styles.topTextStyle}
            title="Hjälp"
            onPress={() =>
              this.props.navigation.navigate("HelpScreen", {})}
          >
          </AppSingleButton>

          <View style={styles.topButton1}>
            <AppSingleButton
              style={styles.topButton}
              textStyle={styles.topTextStyle}
              title="Inställningar"
              onPress={() =>
                this.props.navigation.navigate("SettingsScreen", {})}
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
            sleepTime={this.state.sleepSettings}
            paused={this.state.timerPaused}
            style={styles.timer}
            startTime={this.state.times.duration}
            warningTime={this.state.times.warningTime}
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
}

const showWarningAlert = warning => {
  Alert.alert(
    "Timer",
    "Are you ok?",
    [{ text: "Yes, I'm Ok", onPress: () => warning() }],
    { cancelable: false }
  );
};

const showRestartAlert = restart => {
  smsSender.contactEmergencyContact();
  restart();
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
    width: "100%",
  },
  topButton: {
    width: "100%",
    textAlign: "left",
    paddingLeft: 10,
  },
  timerContainer: {
    alignItems: "center",
    flex: 6
  },
  sleepButtonContainer: {
    alignItems: "flex-end"
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
