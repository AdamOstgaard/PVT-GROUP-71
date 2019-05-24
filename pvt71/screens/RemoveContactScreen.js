import React, { Component } from 'react';
import { Text, View, TextInput, Button} from 'react-native';
import { AppRegistry, StyleSheet } from "react-native";
import { AsyncStorage } from 'react-native';



export default class RemoveContactScreen extends Component {
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
            <Text>Are your sure you want to remove this contact?</Text>
            <Button onPress={()=>AsyncStorage.removeItem('ContactKey')} title="Yes" />
          </View>
    
    
        );
      }

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