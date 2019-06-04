import React from "react";
import { TouchableOpacity, StyleSheet, Image, Alert, Button } from "react-native";

export default class TimerSleepButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: false
    };
    this.showConfirmWindow = this.showConfirmWindow.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.onResume !== this.props.onResume) {
      this.setState({ enabled: this.props.onResume });
    }
  }
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.showConfirmWindow}>
        <Image source={require("../assets/images/zzz-icon-3.png")} />
      </TouchableOpacity>
    );
  }

  toggle() {
    const val = !this.state.enabled;
    this.props.onToggle(val);
    this.setState({ enabled: val });
  }

  showConfirmWindow() {
    if (!this.state.enabled) {
      Alert.alert(
        "Sov",
        "Pausa timern till nästa starttid?",
        [
          { text: "Ja", onPress: () => this.toggle() },
          {
            text: "Avbryt",
            onPress: () => console.log("Avbryt"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }
  }
}

const styles = StyleSheet.create({
  button: {
    height: 90,
    width: 90
  }
});
