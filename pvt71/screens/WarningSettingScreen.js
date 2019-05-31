import React from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
//import BottomLeftButton from "../components/BottomLeftButton";
//import BottomRightButton from "../components/BottomRightButton";
import AppSingleButton from "../components/AppSingleButton";
import { AsyncStorage } from "react-native";
import moment from "moment";

export default class WarningSettingScreen extends React.Component {
  state = {
    selectedMinutes: 20
  }
  updateMinutes = (minutes) =>{
    this.setState({selectedMinutes: minutes})
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.boxContainerTop}>
          <Text style={styles.header}>Varningsintervall</Text>
          <Text style={styles.infoText}>
            Här kan du ändra tiden från det att du missat att verifiera ditt välmående till det att larm skickas ut till din kontaktperson.
          </Text>
        </View>
        <View style={styles.boxContainerMid1}>
          <Text style={styles.pickerDescription}>Antal minuter</Text>
        </View>
        <View style={styles.boxContainerMid2}>
          <Picker style={{height: 84, width:200}} itemStyle={{height: 84}} selectedValue ={this.state.selectedMinutes} onValueChange={this.updateMinutes}>
            <Picker.Item label="10" value={10} ></Picker.Item>  
            <Picker.Item label="20" value={20} ></Picker.Item>
            <Picker.Item label="30" value={30} ></Picker.Item>  
            <Picker.Item label="40" value={40} ></Picker.Item>
            <Picker.Item label="50" value={50} ></Picker.Item>  
            <Picker.Item label="60" value={60} ></Picker.Item>
          </Picker> 
          <View/>
        </View>
        <View style={styles.boxContainerBottom}>
          <View style={styles.bottom}>
            <AppSingleButton
              style={styles.leftButton}
              title="Avbryt"
              onPress={() => this.props.navigation.navigate("HomeScreen")}
            />
            <AppSingleButton
              style={styles.rightButton}
              textStyle={styles.buttonText}
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
      await AsyncStorage.setItem("warning", JSON.stringify(time));
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
    flex: 3
  },
  boxContainerMid1: {
    flex: 3,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  boxContainerMid2: {
    flex: 3,
    alignItems: "center"
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
    flex: 2,
    fontSize: 20,
    marginTop: "0%",
    paddingLeft: 10,
    paddingRight: 20
  },
  pickerDescription: {
    flex: 2,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    bottom: 0
  },
  pickerStyle: {
    width: 200,
    height: 84,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  leftButton: {
    width:"50%",
    backgroundColor: 'grey'

  },
  rightButton: {
    width:"50%",
  },
  buttonText: {
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