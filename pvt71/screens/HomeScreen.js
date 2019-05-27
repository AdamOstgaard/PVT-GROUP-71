import React from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import { Timer } from "../components/Timer";
import TimerSleepButton from "../components/TimerSleepButton";
import moment from "moment";
import { playSound } from "../SoundPlayer";
import AppSingleButton from "../components/AppSingleButton";
import { AsyncStorage } from "react-native";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSleep: true,
      timerPaused: false,
      sleepTime: {
        start: null,
        end: null
      }
    };
    this.checkSleep = this.checkSleep.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  checkSleep() {
    this.setState({ checkSleep: true });
  }

  componentDidUpdate(prevProps, prevState) {
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    //console.log(this.toMilliseconds(hours, min));
    //console.log(this.state.sleepTime.start);
    if (
      this.toMilliseconds(hours, min) >= this.state.sleepTime.start &&
      this.state.checkSleep
    ) {
      this.setState({ timerPaused: true });
      this.setState({ checkSleep: false });
    }
  }

  componentDidMount() {
    if (!this.props.navigation) {
      return;
    }

    this.subs = [
      this.props.navigation.addListener("didFocus", payload =>
        this.getSettings()
      )
    ];
  }

  toMilliseconds = (h, m) =>
    moment.duration(h, "h").asMilliseconds() +
    moment.duration(m, "m").asMilliseconds();

  async getSettings() {
    try {
      const newSleepTime = await AsyncStorage.getItem("sleeptime");
      const s = JSON.parse(newSleepTime);
      const start = s.startTime;
      const end = s.endTime;
      this.setState({ sleepTime: { start, end } });
      //console.log(this.state.sleepTime);
    } catch (error) {}
  }

  componentWillUnmount() {
    this.focusListener.remove();
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
        <View style={styles.topButton}>
        <AppSingleButton
          title="Inställningar"
          onPress={() => this.props.navigation.navigate("Settings")}
        />
        </View>
        <Text style={styles.sleepOnText}>{pauseText}</Text>
        <View style={styles.timerContainer}>
          <Timer
            timeToCheckSleep={this.checkSleep}
            onReset={reset => {
              this.setState({ timerPaused: reset });
            }}
            paused={this.state.timerPaused}
            style={styles.timer}
            startTime={moment.duration(1, "h").asMilliseconds()}
            callback={restart => {
              playSound();
              showRestartAlert(restart);
            }}
          />
        </View>
        <View style={styles.sleepButtonContainer}>
          <TimerSleepButton
            onResume={this.state.timerPaused}
            onToggle={enabled => this.setState({ timerPaused: enabled })}
          />
        </View>
      </View>
    );
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
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      }
    ],
    { cancelable: false }
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff"
  },
  topButton: {
    paddingTop: "10%"
  },
  timerContainer: {
    paddingTop: "10%",
    alignItems: "center"
  },
  sleepButtonContainer: {
    left: 240
  },
  sleepOnText: {
    marginTop: "10%",
    alignSelf: "center",
    fontSize: 18
  }
});
