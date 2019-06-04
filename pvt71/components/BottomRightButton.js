import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default class BottomRightButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.textStyle}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0d6f73",
    width: "50%",
    height: 60
  },
  textStyle: {
    fontSize: 30,
    color: "#fff",
    textAlign: "right",
    paddingRight: 10,
    paddingTop: 8
  }
});