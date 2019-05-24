import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default class AppSingleButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={{...styles.button, ...this.props.style}} onPress={this.props.onPress}>
        <Text style={{...this.props.textStyle,...styles.textStyle}}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0d6f73",
    width: "100%",
    height: 60,
    textAlign: "right",
  },
  textStyle: {
    
    fontSize: 30,
    color: "#fff",
    paddingRight: 10,
    paddingTop: 8
  }
});