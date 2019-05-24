import React from "react";
<<<<<<< HEAD
import { StyleSheet, View, Alert, Button, AsyncStorage } from "react-native";
=======
import { StyleSheet, View, Alert, Text } from "react-native";
>>>>>>> 8d729eaba7840503c0d679111f919d7ce20c824f
import { Timer } from "../components/Timer";
import TimerSleepButton from "../components/TimerSleepButton";
import moment from "moment";
import { playSound } from "../SoundPlayer";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      duration: moment.duration(1, "h").asMilliseconds()
    };
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener("didFocus", payload =>
        this.getSettings()
      )
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

=======
      timerPaused: false
    };
  }
>>>>>>> 8d729eaba7840503c0d679111f919d7ce20c824f
  static navigationOptions = {
    header: null
  };

  render() {
    let pauseText;
    if (this.state.timerPaused) {
      pauseText = "VILOLÄGET ÄR PÅ";
    } else {
      pauseText = "VILOLÄGET ÄR AV";
    }

    return (
      <View style={styles.container}>
        <Text style={styles.sleepOnText}>{pauseText}</Text>
        <View style={styles.timerContainer}>
          <Timer
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
<<<<<<< HEAD
=======
          />
        </View>
        <View style={styles.sleepButtonContainer}>
          <TimerSleepButton
            onResume={this.state.timerPaused}
            onToggle={enabled => this.setState({ timerPaused: enabled })}
>>>>>>> 8d729eaba7840503c0d679111f919d7ce20c824f
          />
        </View>
      </View>
    );
  }

  async getSettings() {
    try {
      const duration = await AsyncStorage.getItem("time");
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
  timerContainer: {
    paddingTop: "10%",
    alignItems: "center"
  },
  sleepButtonContainer: {
    left: 240
  },
  sleepOnText: {
    marginTop: "30%",
    alignSelf: "center",
    fontSize: 18
  }
});
