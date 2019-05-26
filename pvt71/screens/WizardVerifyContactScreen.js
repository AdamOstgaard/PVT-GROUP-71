import React from "react";
import AppSingleButton from "../components/AppSingleButton";
import { StyleSheet, Text, View, TextInput} from "react-native";

export default class WizardVerifyContactScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: 'placeholder', number: '##########'};
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Sätt nödkontakt</Text>
        <Text style={styles.infoText}>
          {" "}
          Nödkontakt namn: 
        </Text>
        <TextInput style={styles.textInput}
        onChangeText={(name) => this.setState({name})}
        value={this.state.name}
        />
        <Text style={styles.infoText}>
          {" "}
          Nödkontakt telefonnummer: 
        </Text>
        <TextInput style={styles.textInput}
        onChangeText={(number) => this.setState({number})}
        value={this.state.number}
        />
        <View style={styles.bottom}>
          <AppSingleButton
            title="Nästa"
            onPress={() =>
              this.props.navigation.navigate("WizardSettingsScreen")
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