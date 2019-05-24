import React, { Component } from 'react';
import { Text, View, TextInput, Button} from 'react-native';
import { AppRegistry, StyleSheet } from "react-native";
import { AsyncStorage } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


export default class AddNewContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      phonenumber: null,
      contactFirstName:''
    };}
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{this.state.contactFirstName}</Text>
        <Button title='show' onPress={this._retrieveData}/>
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
        <Button onPress={ this._storeData} title="Add contact person" />
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
