import React, {Component} from 'react';
import {Button, View, Text, Alert} from "react-native";

export default class GeoLocation extends Component{
    constructor(props) {
        super(props);

        this.state = {
            lat: null,
            long: null,

        };
    }

    getGeoInfo = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
               this.setState({
                   lat: position.coords.latitude,
                   long: position.coords.longitude,
               });
           },
            (error) => Alert.alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
        
    };

    render(){
        return(
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Hämta Position" onPress={this.getGeoInfo} />
                <Text>Latitude: {this.state.lat}</Text>
                <Text>Longitude: {this.state.long}</Text>
            </View>
        );
    }
 
}



