import React from "react";
import { StyleSheet, Text, View, ScrollView} from "react-native";
import AppSingleButton from "../components/AppSingleButton";
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <View style = {styles.container}>
        <AppSingleButton
          style={styles.topButton}
          textStyle={styles.textTop}
          title ="Tillbaka"
            onPress={() =>
              this.props.navigation.navigate("HomeScreen",{})}
        ></AppSingleButton>
        <ScrollView style = {styles.scrollContainer}>

          <Text style ={styles.category}>Inställningar</Text>

          <AppSingleButton
          style={styles.linkButton}
          textStyle ={styles.text}
          title="Redigera tidsintervall"
            onPress={() =>
              this.props.navigation.navigate("TimerSettingsScreen",{})}
          ></AppSingleButton>

          <AppSingleButton
          style={styles.linkButton}
          textStyle ={styles.text}
          title="Redigera varningsintervall"
            onPress={() => 
              this.props.navigation.navigate("WarningSettingScreen",{})}
          ></AppSingleButton>

          <AppSingleButton
          style={styles.linkButton}
          textStyle ={styles.text}
          title="Redigera sömntider"
            onPress={() => 
              this.props.navigation.navigate("SleepTimeSettingsScreen",{})}
          ></AppSingleButton>

          <AppSingleButton
          style={styles.linkButton}
          textStyle ={styles.text}
          title="Redigera kontaktperson"
            onPress={() =>
              this.props.navigation.navigate("HomeScreen",{})}
          ></AppSingleButton>

          <AppSingleButton
          style={styles.linkButton}
          textStyle ={styles.text}
          title="Pausa applikationen"
            onPress={() =>
              this.props.navigation.navigate("HomeScreen",{})}
          ></AppSingleButton>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight(),
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {},
  topButton: {
    width:"100%",
  },
  category: {
    fontWeight: 'bold',
    fontSize: 32,
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    marginTop: "5%"
  },
  linkButton: {
    fontSize: 20,
    color: "#000",
    backgroundColor: "#fff",
    width:"100%",
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
  },
  text: {
    fontSize: 20,
    color: "black",
    paddingRight: 10,
    paddingTop: 16,
    textAlign: 'left',
  },
  textTop: {
    fontSize: 30,
    color: "#fff",
    paddingRight: 10,
    paddingTop: 8,
    textAlign: 'left'
  }
});
