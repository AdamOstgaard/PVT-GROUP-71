import AppSingleButton from "../components/AppSingleButton";
import React from "react";
import { StyleSheet, View, Alert, Text, AsyncStorage } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
    render(){
        return(
            <View style = {styles.container}>
                <View style ={styles.topButtonContainer}>
                    <AppSingleButton
                    style={styles.topButton}
                    textStyle={styles.textTop}
                    title ="Tillbaka"
                        onPress={() =>
                        this.props.navigation.navigate("HomeScreen",{})}
                    ></AppSingleButton>
                    <Text> Denna sida är otillgänlig pga underhåll</Text>
                </View>

            </View>




        )
    }
}


    const styles = StyleSheet.create({
        container: {
          marginTop: getStatusBarHeight(),
          flex: 1,
          backgroundColor: "#fff",
        },
        topButtonContainer:{
            flex: 1,
        },
        textTop:{
            textAlign: "left"
        }


    });
