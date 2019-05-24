import React from "react";

import { StyleSheet, View, Alert, Text, AsyncStorage } from "react-native";
import AppSingleButton from "../components/AppSingleButton";
import { Timer } from "../components/Timer";
import TimerSleepButton from "../components/TimerSleepButton";
import moment from "moment";
import { playSound } from "../SoundPlayer";
import { NavigationEvents } from "react-navigation";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: moment.duration(1, "h").asMilliseconds(),
      timerPaused: false
    };
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
    //var {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style ={styles.topContainer}>
          <AppSingleButton style={styles.topButton} title="Inställningar"
            onPress={() => 
              this.props.navigation.navigate("TimerSettingsScreen",{})}
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
            startTime={this.state.duration}
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
  topButton: {
    width:"100%",
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
