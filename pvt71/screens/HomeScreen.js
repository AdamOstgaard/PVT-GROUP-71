import React from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
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
    let pauseText;
    if (this.state.timerPaused) {
      pauseText = "VILOLÄGET ÄR PÅ";
    } else {
      pauseText = "VILOLÄGET ÄR AV";
    }
    var {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style ={styles.topContainer}>
          <AppSingleButton style={styles.topButton} title="Inställningar"
            onPress={() => 
              navigate("WarningSettingScreen",{})}
          >
          </AppSingleButton>
        </View>
        <Text style={styles.sleepOnText}>{pauseText}</Text>
        <View style={styles.timerContainer}>
          <Timer
            onReset={reset => {
              this.setState({ timerPaused: reset });
            }}
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
  topContainer: {
    paddingTop: "10%",
    alignItems: "center",
    textAlign: "left",
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
