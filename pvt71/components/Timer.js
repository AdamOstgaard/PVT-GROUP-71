import React from "react";
import { AppRegistry, Text, View, StyleSheet } from "react-native";
import moment from "moment";
import "moment-duration-format";
import { AsyncStorage } from "react-native";

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
      stopsleep: false
    };
  }

  componentDidMount() {
    this.getSettings();
    this.startTimer(this.state.time);
    //console.log("sleeping: " + this.state.sleeping)
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.sleepTime.start !== this.state.sleepTime.start ||
      prevState.sleepTime.end !== this.state.sleepTime.end
    ) {
      this.setState({ stopsleep: false });
    }

    //console.log("sleepin is " + this.state.sleeping);
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var currentTimeInMilliseconds = this.toMilliseconds(hours, min);
    if (prevProps.onFocus !== this.props.onFocus) {
      await this.getSettings();
      //console.log("sleeping1: " + this.state.sleeping);
    }
    if (
      currentTimeInMilliseconds >= this.state.sleepTime.start &&
      currentTimeInMilliseconds <= this.state.sleepTime.end
    ) {
      if (
        !this.state.sleeping &&
        this.state.sleepTime.start !== null &&
        !this.state.stopsleep
      ) {
        //console.log("sleeping2: " + this.state.sleepTime.end);
        this.setState({ sleeping: true }, () => {
          this.pauseTimer();
          this.startTimer(
            this.state.sleepTime.end - this.state.sleepTime.start
          );
          this.props.onTimerSleep(true);
        });
      }
    } else if (
      currentTimeInMilliseconds >= this.state.sleepTime.start &&
      currentTimeInMilliseconds >= this.state.sleepTime.end
    ) {
      if (
        !this.state.sleeping &&
        this.state.sleepTime.start !== null &&
        !this.state.stopsleep
      ) {
        //console.log("sleeping2: " + this.state.sleepTime.end);
        this.setState({ sleeping: true }, () => {
          this.pauseTimer();
          this.startTimer(
            this.toMilliseconds(24,0) - this.state.sleepTime.start + this.state.sleepTime.end
          );
          this.props.onTimerSleep(true);
        });
      }
    }
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
      //console.log(end);
      await this.setState({ sleepTime: { start, end } });
    } catch (error) {
      console.log("ERROR");
    }
  }

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

    if (this.state.counter === 60) {
      this.setState({ counter: 0 });
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
