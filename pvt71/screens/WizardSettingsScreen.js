import React from "react";
import AppSingleButton from "../components/AppSingleButton";
import { StyleSheet, Text, View, Button } from "react-native";

export default class WizardVerifyContactScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Wizard Settings Screen.</Text>
        <View style={styles.bottom}>
        <Button title='Add new contact' onPress={()=> this.props.navigation.navigate("AddNewContactScreen")}></Button>
        <Button title='Change contact' onPress={()=> this.props.navigation.navigate("ChangeContactScreen")}></Button>
        <Button title='Remove contact' onPress={()=> this.props.navigation.navigate("RemoveContactScreen")}></Button>
          <AppSingleButton
            title="Next"
            onPress={() =>
              this.props.navigation.navigate("HomeScreen")
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
