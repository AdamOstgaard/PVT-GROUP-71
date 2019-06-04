import React from "react";
import AppSingleButton from "../components/AppSingleButton";
import { StyleSheet, Text, View, Picker, ScrollView } from "react-native";
import TimePicker from "react-native-simple-time-picker"
import { AsyncStorage } from "react-native";
import moment from "moment";

export default class WizardVerifyContactScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }
  state = {
    selectedHours: 5,
    SelectedMinutes: 0,
    warningHours: 0,
    warningMinutes: 10,
  }

  updateWarningMinutes = (minutes) =>{
    this.setState({warningMinutes: minutes})
  };

  render() {
    const { selectedHours, selectedMinutes, warningHours, warningMinutes } = this.state;
    return (
      <View style={styles.container}>
      <ScrollView>
        <View style={styles.boxContainerTop}>
          <Text style={styles.heading}>Timerinställningar</Text>
        </View>

        <Text style={styles.infoText}>
            Här kan du ändra hur ofta du vill verifiera ditt välmående
        </Text>
        <View style={styles.timerInfo}>
          <Text style={styles.picker}>Timmar</Text>
          <Text style={styles.picker}>Minuter</Text>
        </View>
        <View style={styles.boxContainer}>
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
            Här kan du ändra hur många minuter mellan att du får en varning tills att din kontaktperson kontaktas. 
        </Text>
        <View style={styles.warningInfo}>
            <Text style={styles.picker}>Minuter</Text>
        </View>
        <View style={styles.boxContainerBottom}>
        <Picker style={{height: 84, width:200}} itemStyle={{height: 84}} selectedValue ={this.state.warningMinutes} onValueChange={this.updateWarningMinutes}>
            <Picker.Item label="10" value={10} ></Picker.Item>
            <Picker.Item label="20" value={20} ></Picker.Item>
            <Picker.Item label="30" value={30} ></Picker.Item>
            <Picker.Item label="40" value={40} ></Picker.Item>
            <Picker.Item label="50" value={50} ></Picker.Item>
            <Picker.Item label="60" value={60} ></Picker.Item>
          </Picker>
        </View>
        </ScrollView>
        <View style={styles.boxContainer}>
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
    justifyContent: 'space-between',
  },
  boxContainer: {},
  boxContainerBottom: {
    paddingBottom: 60,
  },
  timerInfo: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  warningInfo: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  heading: {
    fontSize: 30,
    left: 10,
    marginTop: 50
  },
  infoText: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 20,
    marginBottom: 10
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
    bottom: 0,
    flex: 1,
    width: "100%",
    justifyContent: "flex-end"
  }
});
