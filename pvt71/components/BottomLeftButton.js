
import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default class BottomLeftButton extends React.Component {
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
    backgroundColor: "#a9a9a9",
    width: "50%",
    height: 60
  },
  textStyle: {
    fontSize: 30,
    color: "#fff",
    textAlign: "left",
    paddingLeft: 10,
    paddingTop: 8
  }
});
