import React, { Component } from 'react';
import { Text, View, TextInput, Button} from 'react-native';
import { AppRegistry, StyleSheet } from "react-native";
import { AsyncStorage } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


export default class ChangeContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactFirstName: null,
      contactLastName: null,
      contactPhonenumber: null,
      contactFirstName:''
    };
this._retrieveData();
}
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Actual contact information</Text>
        <Text>{this.state.contactFirstName}</Text>
        <Text>{this.state.contactLastName}</Text>
        <Text>{this.state.contactPhonenumber}</Text>
        <Text>Add new contact</Text>
        <Text>First name:</Text>
        <TextInput
          placeholder="Name"
          maxLength={50}
          onChangeText={firstName => this.setState({ firstName })}
        />
        <Text>Surnname:</Text>
        <TextInput
          placeholder="Surname"
          maxLength={58}
          onChangeText={lastName => this.setState({ lastName })}
        />
        <Text>Phonenumber:</Text>
        <TextInput
          placeholder="Phonenumber"
          maxLength={10}
          onChangeText={phonenumber => this.setState({ phonenumber })}
        />
        <Button onPress={ this._storeData} title="Change contact" />
      </View>


    );
  }

  _storeData = async () => {
    let contactPerson= {
      firstName: this.state.firstName,
      lastName:this.state.lastName,
      phonenumber: this.state.phonenumber
    }
    try {
      await AsyncStorage.setItem('ContactKey', JSON.stringify(contactPerson));
    } catch (error) {

      // Error saving data
    }
    
  };

  _retrieveData = async () =>  {
    try {
      const value = await AsyncStorage.getItem('ContactKey');
      const d = JSON.parse(value);
      this.setState({ contactFirstName: d.firstName });
      this.setState({ contactLastName: d.lastName });
      this.setState({ contactPhonenumber: d.phonenumber });
      console.log(d);
    } catch (error) {
      // Error retrieving data
    }
  };
}