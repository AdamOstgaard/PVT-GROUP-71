import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Timer } from "../components/Timer";
import TimerSleepButton from "../components/TimerSleepButton";
import moment from "moment";
import { playSound } from "../SoundPlayer";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerPaused: false
    };
  }
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <Timer
            paused={this.state.timerPaused}
            style={styles.timer}
            startTime={moment.duration(2, "h").asMilliseconds()}
            callback={restart => {
              playSound();
              showRestartAlert(restart);
            }}
          />
        </View>
        <View style={styles.sleepButtonContainer}>
          <TimerSleepButton
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
    flex: 1,
    backgroundColor: "#fff"
  },
  timerContainer: {
    paddingTop: 120,
    alignItems: "center",
    marginHorizontal: 150
  },
  sleepButtonContainer: {
    left: 240
  }
});
