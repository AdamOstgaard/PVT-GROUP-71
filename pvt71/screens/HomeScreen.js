import React from "react";
import { StyleSheet, View } from "react-native";
import { Timer } from "../components/Timer";
import moment from "moment";
import {playSound} from "../SoundPlayer"

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <Timer
            style={styles.timer}
            startTime={moment.duration(2, "h").asMilliseconds()}
            callback={() => playSound()}
          />
        </View>
      </View>
    );
  }
}

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
