import React, { Component } from 'react';
import { Text, View, TextInput, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native';
import { AppRegistry, StyleSheet } from "react-native";
import { AsyncStorage } from 'react-native';




// export class Contact extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstName: null,
//       lastName: null,
//       phonenumber: null
//     };
//   }

//   changeFirstName(newName) {
//     this.setState({ lastName, phonenumber, firstName: newName });
//   }

// };
// AppRegistry.registerComponent("Contact", () => Contact);







export default class LinksScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      phonenumber: null,
      contactFirstName: ''
    };
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{this.state.firstName}</Text>
        <Button title='show' onPress={this._retrieveData}>showContact: {this.state.contactFirstName}</Button>
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
        <Button onPress={() => this._storeData} title="Add contact person" />
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

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('ContactKey');
      if (value !== null) {
        this.setState({firstName: value});
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
}