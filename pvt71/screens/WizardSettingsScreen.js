import React from "react";
import AppSingleButton from "../components/AppSingleButton";
import { StyleSheet, Text, View, Picker } from "react-native";
import TimePicker from "react-native-simple-time-picker"
import { AsyncStorage } from "react-native";
import moment from "moment";

export default class WizardVerifyContactScreen extends React.Component {
  state = {
    selectedHours: 5,
    SelectedMinutes: 0,
    warningHours: 1,
    warningMinutes: 30,
  }  
  updateMinutes = (minutes) =>{
    this.setState({selectedMinutes: minutes})
  }
  ;
  
  render() {
    const { selectedHours, selectedMinutes, warningHours, warningMinutes } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.boxContainerTop}>
          <Text style={styles.heading}>Timerinställningar</Text>
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
        <Text style={styles.infoText}>
            Här kan du ändra hur många minuter innan timern gått ner till 0 som du vil verifiera ditt välmående
        </Text>
        <View style={styles.boxContainerMid3}>
            <Text style={styles.picker}>Minuter</Text>
        </View>
        <View style={styles.boxContainerMid4}>
        <Picker style={{height: 84, width:200}} itemStyle={{height: 84}} selectedValue ={this.state.selectedMinutes} onValueChange={this.updateMinutes}>
            <Picker.Item label="10" value={10} ></Picker.Item>  
            <Picker.Item label="20" value={20} ></Picker.Item>
            <Picker.Item label="30" value={30} ></Picker.Item>  
            <Picker.Item label="40" value={40} ></Picker.Item>
            <Picker.Item label="50" value={50} ></Picker.Item>  
            <Picker.Item label="60" value={60} ></Picker.Item>
          </Picker> 
        </View>
        <View style={styles.boxContainerBottom}>
          <View style={styles.bottom}>
            <AppSingleButton
              title="Nästa"
              onPress={() => {
                const duration = this.toMilliseconds(
                  this.state.selectedHours,
                  this.state.selectedMinutes
                );
                const warning = this.toMilliseconds(
                  this.state.warningHours,
                  this.state.warningMinutes
                );
                this.saveSettings(duration, warning);
                this.props.navigation.navigate("HomeScreen", { duration, warning });
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


  async saveSettings(time, warning) {
    try {
      await AsyncStorage.setItem("time", JSON.stringify(time));
      await AsyncStorage.setItem("warning", JSON.stringify(warning));
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
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  boxContainerMid2: {
    flex: 1
  },
  boxContainerMid3: {
    flex: 1, 
    flexDirection: "row",
    alignItems: "flex-end"
  },
  boxContainerMid4: {
    flex: 1
  },
  boxContainerBottom: {
    flex: 1
  },
  heading: {
    fontSize: 35,
    flex: 1,
    left: 10,
    marginTop: 50
  },
  infoText: {
    flex: 1,
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 20
  },
  picker: {
    flex: 1,
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 10,
    bottom: 0
  },
  bottom: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    flex: 1,
  }
});
