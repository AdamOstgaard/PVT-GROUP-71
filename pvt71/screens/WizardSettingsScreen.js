import React from "react";
import AppSingleButton from "../components/AppSingleButton";
import { StyleSheet, Text, View } from "react-native";

export default class WizardVerifyContactScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Wizard Settings Screen.</Text>
        <View style={styles.bottom}>
          <AppSingleButton
            title="Next"
            onPress={() =>
              this.props.navigation.navigate("Home")
            }
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
  bottom: {
    flex: 1,
    justifyContent: "flex-end"
  }
});
