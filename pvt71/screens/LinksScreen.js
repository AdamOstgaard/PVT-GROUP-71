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
      console.log(contactPerson.firstName);
    } catch (error) {

      // Error saving data
    }
    
  };



  _retrieveData = async () =>  {
    try {
      const value = await AsyncStorage.getItem('ContactKey');
      const d = JSON.parse(value);
      this.setState({ contactFirstName: d.firstName });
      console.log(d);
    } catch (error) {
      // Error retrieving data
    }
  };

}
