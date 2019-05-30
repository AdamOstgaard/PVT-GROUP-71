import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import AppSingleButton from "../components/AppSingleButton";


export default class WizardWelcomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress()  {
    this.props.navigation.navigate("WizardVerifyContactScreen");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Wizard Welcome Screen.</Text>
        {/* Adderad 2 nästa rad för att kunna test på min mobil */}
        <Text style={styles.infoText}>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <View style={styles.bottom}>
          <AppSingleButton
            title="Next"
            onPress={this.handlePress}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 35,
    flex: 1,
    justifyContent: "flex-start",
    left: 10,
    marginTop: 50
  },
  infoText: {
    fontSize: 20,
    marginBottom: 50,
    paddingLeft: 10
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end"
  }
});