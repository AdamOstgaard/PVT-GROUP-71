import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppSingleButton from "../components/AppSingleButton";
import TimePicker from "react-native-simple-time-picker";
import { AsyncStorage } from "react-native";
import moment from "moment";

export default class TimerSettingsScreen extends React.Component {
  state = {
    selectedHours: 5,
    selectedMinutes: 0
  };

  static navigationOptions = {
    header: null
  };

  render() {
    const { selectedHours, selectedMinutes } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.boxContainerTop}>
          <Text style={styles.header}>Timerinställningar</Text>
          <Text style={styles.infoText}>
            Här kan du ändra hur ofta du vill verifiera ditt välmående
          </Text>
        </View>
        <View style={styles.boxContainerMid1}>
          <Text style={styles.picker}>Timmar</Text>
          <Text style={styles.picker}>Minuter</Text>
        </View>
        <View style={styles.boxContainerMid2}>
          <TimePicker
            selectedHours={selectedHours}
            selectedMinutes={selectedMinutes}
            onChange={(hours, minutes) =>
              this.setState({
                selectedHours: hours,
                selectedMinutes: minutes
              })
            }
          />
        </View>
        <View style={styles.boxContainerBottom}>
          <View style={styles.bottom}>
            <AppSingleButton
              style ={styles.bottomLeft}
              textStyle = {styles.leftText}
              title="Avbryt"
              onPress={() => this.props.navigation.navigate("HomeScreen")}
            />
            <AppSingleButton
              style ={styles.bottomRight}
              textStyle ={styles.rightText}
              title="Spara"
              onPress={() => {
                const duration = this.toMilliseconds(
                  this.state.selectedHours,
                  this.state.selectedMinutes
                );
                this.saveSettings(duration);
                this.props.navigation.navigate("HomeScreen", { duration });
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  toMilliseconds = (h, m) =>
    moment.duration(h, "h").asMilliseconds() +
    moment.duration(m, "m").asMilliseconds();

  async saveSettings(time) {
    try {
      await AsyncStorage.setItem("time", JSON.stringify(time));
    } catch (error) {
      // Error saving data
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start"
  },
  boxContainerTop: {
    flex: 2
  },
  boxContainerMid1: {
    flex: 3,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  boxContainerMid2: {
    flex: 3
  },
  boxContainerBottom: {
    flex: 2
  },

  header: {
    fontSize: 35,
    flex: 1,
    left: 10,
    marginTop: "10%",
    marginBottom: "0%"
  },
  infoText: {
    flex: 1,
    fontSize: 20,
    marginTop: "0%",
    paddingLeft: 10,
    paddingRight: 20
  },
  picker: {
    flex: 2,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    bottom: 0
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  bottomLeft:{
    width: "50%",
    textAlign: "left",
    backgroundColor: '#a9a9a9'
  },
  leftText:{
    textAlign: "left"
  },
  bottomRight:{
    width: "50%",
    alignItems: "flex-end"
  },
  rightText: {
    textAlign: "right"
  }

  /*
  heading: {
    fontSize: 35,
    flex: 1,
    left: 10,
    marginTop: "10%",
    marginBottom: "0%"
  },
  infoText: {
    flex: 1,
    fontSize: 20,
    marginTop: '0%',
    marginBottom: '0%',
    paddingLeft: 10,
    paddingRight: 20
  },
  picker: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '0%',
    marginBottom: '0%',
    
  
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end"
  } */
});
