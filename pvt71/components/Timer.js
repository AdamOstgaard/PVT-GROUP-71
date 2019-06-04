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

    let endTime = this.props.sleepTime.end;

    if (endTime <= this.props.sleepTime.start) {
      endTime += this.toMilliseconds(24, 0);
      //console.log(endTime)
    }

    if (prevProps.sleepTime !== this.props.sleepTime) {
      this.setState({ sleepWillStop: false });
      this.setState({ sleeping: false, time: this.props.startTime })
      return;
    }

    const shouldSleep = this.props.sleepTime.end <= this.props.sleepTime.start
      ? (currentTimeInMilliseconds >= this.props.sleepTime.start
        || currentTimeInMilliseconds <= this.props.sleepTime.end) && !this.state.sleeping
      : currentTimeInMilliseconds >= this.props.sleepTime.start &&
      currentTimeInMilliseconds <= this.props.sleepTime.end && !this.state.sleeping;


    if (shouldSleep) {
      this.setState({
        sleeping: true
      });

      //console.log( 2 * this.props.sleepTime.start - currentTimeInMilliseconds)

      let sleepDuration = endTime - this.props.sleepTime.start - (this.props.sleepTime.start - currentTimeInMilliseconds);

      this.pauseTimer();
      this.startTimer(sleepDuration);
      this.props.onTimerSleep(true);
    }
  }

  toMilliseconds = (h, m, s) =>
    moment.duration(h, "h").asMilliseconds() +
    moment.duration(m || 0, "m").asMilliseconds() +
    moment.duration(s || 0, "s").asMilliseconds();

  render() {
    return (
      <View style={styles.timerContainer}>
        <Text
          {...this.props}
          onPress={() => {
            if (this.props.onPress) this.props.onPress();
            this.props.onReset(false);
            this.resetTimer();
            console.log(this.props.startTime);
          }}
          style={styles.timerText}
        >
          {this.formatTime(this.state.time)}
        </Text>
        <Text style={{ fontSize: 12, borderWidth: 0, display: "flex" }}>
          Tryck för att starta om
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

    //console.log(this.state.warningTime);

    if (this.state.time < this.state.warningTime && this.props.warningCallback && this.state.warningStarted === false) {
      this.setState({ warningStarted: true });
      this.props.warningCallback(() => this.resetTimer());
    }

    if (this.state.time > 0) {
      return;
    }

    if (this.state.sleeping) {
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
