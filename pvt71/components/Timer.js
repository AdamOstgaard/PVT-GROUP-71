import React from "react";
import { AppRegistry, Text, View, StyleSheet } from "react-native";
import moment from "moment";
import "moment-duration-format";

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerRunning: false,
      time: this.props.startTime,
      counter: 0,
      sleepTime: {
        start: null,
        end: null
      },
      sleeping: false,
      sleepWillStop: false,
      warningTime: this.props.warningTime,
      warningStarted: false
    };
  }

  componentDidMount() {
    this.startTimer(this.state.time);
    //console.log("sleeping: " + this.state.sleeping)
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log("sleepin is " + this.state.sleeping);
    const d = new Date();

    const hours = d.getHours(); //Current Hours
    const min = d.getMinutes(); //Current Minutes
    const currentTimeInMilliseconds = this.toMilliseconds(hours, min);

    if (!this.props.sleepTime) {
      return;
    }

    if (prevProps.sleepTime !== this.props.sleepTime) {
      this.setState({ sleepWillStop: false });
    }

    if (
      currentTimeInMilliseconds >= this.props.sleepTime.start &&
      currentTimeInMilliseconds <= this.props.sleepTime.end
    ) {
      if (
        !this.state.sleeping &&
        this.props.sleepTime.start !== null &&
        !this.state.sleepWillStop
      ) {
        //console.log("sleeping2: " + this.state.sleepTime.end);
        this.setState({ sleeping: true }, () => {
          this.pauseTimer();
          this.startTimer(
            this.props.sleepTime.end - this.props.sleepTime.start
          );
          this.props.onTimerSleep(true);
        });
      }
    } else if (
      currentTimeInMilliseconds >= this.props.sleepTime.start &&
      currentTimeInMilliseconds >= this.props.sleepTime.end
    ) {
      if (
        !this.state.sleeping &&
        !this.state.sleepWillStop
      ) {
        //console.log("sleeping2: " + this.state.sleepTime.end);
        this.setState({ sleeping: true }, () => {
          this.pauseTimer();
          this.startTimer(
            this.toMilliseconds(24, 0) - this.props.sleepTime.start + this.props.sleepTime.end
          );
          this.props.onTimerSleep(true);
        });
      }
    }
  }

  toMilliseconds = (h, m) =>
    moment.duration(h, "h").asMilliseconds() +
    moment.duration(m, "m").asMilliseconds();

  render() {
    return (
      <View style={styles.timerContainer}>
        <Text
          {...this.props}
          onPress={() => {
            if (this.props.onPress) this.props.onPress();
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
    if (this.state.sleeping) {
      return;
    }
    this.props.onReset(false);
    this.stopTimer();
    this.startTimer(this.props.startTime);
    this.setState({ warningStarted: false });
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
      time: this.state.time - interval,
      counter: this.state.counter + 1
    });


    if (this.state.time < this.state.warningTime && this.props.warningCallback && this.state.warningStarted === false) {
      this.setState({ warningStarted: true });
      this.props.warningCallback(() => this.resetTimer());
    }

    if (this.state.time > 0) {
      return;
    }

    if (this.state.sleeping) {
      this.setState({ sleeping: false, stopsleep: true });
      this.stopTimer();
      this.startTimer(this.props.startTime);
      this.props.onTimerSleep(false);
      //console.log("vilan är över");
      return;
    }

    if (this.props.callback && !this.state.sleeping) {
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
