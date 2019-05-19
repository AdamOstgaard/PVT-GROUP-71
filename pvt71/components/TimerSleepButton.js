import React from "react";
import { TouchableOpacity, StyleSheet, Image, Alert } from "react-native";

export default class TimerSleepButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: false
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.onResume !== this.props.onResume) {
      this.setState({ enabled: false });
    }
  }
  render() {
    

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {if(this.state.enabled){
          this.whenSleepModeOn();
        }else{
          this.showConfirmWindow();
        }}}
      >
        <Image source={require("../assets/images/zzz-icon-3.png")} />
      </TouchableOpacity>
    );
  }

  toggle() {
    const val = !this.state.enabled;
    this.props.onToggle(val);
    this.setState({ enabled: val });
  }
  
  whenSleepModeOn() {
    console.log("sleep is on");
  }

  showConfirmWindow() {
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

const styles = StyleSheet.create({
  button: {
    height: 90,
    width: 90
  }
});
