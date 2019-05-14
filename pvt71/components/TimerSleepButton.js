import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";

export default class TimerSleepButton extends React.Component {
  constructor(props) {
    super(props);
    this.state({
      enabled: false
    });
  }
    
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={}>
        <Image source={require("../assets/images/zzz-icon-3.png")} />
      </TouchableOpacity>
    );
  }

  toggle() {
      const val = !this.state.enabled;
      this.props.onPress(val)
      this.setState({ enabled: val });
  }
}

const styles = StyleSheet.create({
  button: {
    height: 90,
    width: 90
  }
});
