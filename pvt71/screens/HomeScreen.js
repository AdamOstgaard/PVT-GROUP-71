import React from "react";
import { StyleSheet, View, Alert, Button, AsyncStorage } from "react-native";
import { Timer } from "../components/Timer";
import moment from "moment";
import { playSound } from "../SoundPlayer";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <Timer
            style={styles.timer}
            startTime={this.state.duration}
            callback={restart => {
              playSound();
              showRestartAlert(restart);
            }}
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
    flex: 1,
    backgroundColor: "#fff"
  },
  timerContainer: {
    paddingTop: 120,
    alignItems: "center",
    marginHorizontal: 150
  }
});
