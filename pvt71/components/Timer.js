import React from "react";
import { AppRegistry, Text, View, StyleSheet } from "react-native";
import moment from "moment";
import "moment-duration-format";

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerRunning: false,
      time: this.props.startTime
    };
  }
  componentDidMount() {
    this.startTimer(this.state.time);
  }

  componentDidUpdate(prevProps, PrevState) {
    if (this.props.paused !== prevProps.paused && this.props.paused) {
      this.pauseTimer();
    }
  }

  render() {
    return (
      <View style={styles.timerContainer}>
        <Text
          {...this.props}
          onPress={() => {
            this.props.onReset(false);
            this.resetTimer();
          }}
          style={styles.timerText}
        >
          {this.formatTime(this.state.time)}
        </Text>
        <Text style={{ fontSize: 12, borderWidth: 0, display: "flex" }}>
          Press to reset
        </Text>
      </View>
    );
  }

  resetTimer() {
    this.stopTimer();
    this.startTimer(this.props.startTime);
  }

  startTimer(time) {
    this.setState({ time, timerRunning: true });
    const timerInterval = 1000;

    this.timer = setInterval(
      () => this.handleTick(timerInterval),
      timerInterval
    );
  }

  handleTick(interval) {
    this.setState({
      time: this.state.time - interval
    });

    if (this.state.time > 0) {
      return;
    }

    if (this.props.callback) {
      this.props.callback(() => this.resetTimer());
    }

    this.pauseTimer();
  }

  pauseTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.setState({ timerRunning: false });
  }

  stopTimer() {
    this.pauseTimer();
    this.setState({ timerRunning: false, time: this.props.startTime });
  }

  resumeTimer() {
    startTimer(this.state.time);
  }

  formatTime = time => moment.duration(time).format("h:mm:ss");
}
const styles = StyleSheet.create({
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    width: 280,
    height: 280,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 1000,
    flexDirection: "column"
  },
  timerText: {
    fontSize: 64,
    display: "flex"
  }
});

AppRegistry.registerComponent("Timer", () => Timer);
