import React from "react";
import AppSingleButton from "../components/AppSingleButton";
import { StyleSheet, Text, View, TextInput, AsyncStorage } from "react-native";


export default class WizardVerifyContactScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: 'Förnamn', 
      lastName: 'Efternamn',
      number: '##########'};
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Sätt nödkontakt</Text>
        <Text style={styles.infoText}>
          {" "}
          Nödkontakt förnamn: 
        </Text>
        <TextInput style={styles.textInput}
        onChangeText={(firstName) => this.setState({firstName})}
        value={this.state.firstName}
        onSubmitEditing={() => {this.secondText.focus();}}
        />
        <Text style={styles.infoText}>
          {" "}
          Nödkontakt efternamn: 
        </Text>
        <TextInput style={styles.textInput}
        ref={(input) => {this.secondText = input; }}
        onChangeText={(lastName) => this.setState({lastName})}
        value={this.state.lastName}
        onSubmitEditing={() => {this.thirdText.focus();}}
        />
        <Text style={styles.infoText}>
          {" "}
          Nödkontakt telefonnummer: 
        </Text>
        <TextInput style={styles.textInput}
        ref={(input) => {this.thirdText = input; }}
        onChangeText={(number) => this.setState({number})}
        value={this.state.number}
        />
        <View style={styles.bottom}>
          <AppSingleButton
            title="Nästa"
            onPress={() => {
              this.saveSettings();
              this.props.navigation.navigate("WizardSettingsScreen");
            }}
          />
        </View>
      </View>
    );
  }

  async saveSettings() {
    let contactPerson = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      number: this.state.number
    }
    try {
      await AsyncStorage.setItem("contact", JSON.stringify(contactPerson));
    } catch (error) {

    }
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
  textInput: {
    height: 40,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end"
  }
});