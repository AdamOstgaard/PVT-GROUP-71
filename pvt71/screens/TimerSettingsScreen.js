import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomLeftButton from "../components/BottomLeftButton";
import BottomRightButton from "../components/BottomRightButton";
import TimePicker from 'react-native-simple-time-picker';


export default class TimerSettingsScreen extends React.Component {
  state = {
    selectedHours: 5,
    selectedMinutes: 0,
   
  }
  static navigationOptions = {
    header: null,
  }

  render() {
    const { selectedHours, selectedMinutes } = this.state;
    return (
      <View style={styles.container}>
      <Text style={styles.heading}>Tidsintervall</Text>
      <Text style={styles.infoText}>
        Här kan du ändra hur ofta du vill verifiera ditt välmående!! 
        </Text>
        <Text style ={styles.picker}>{selectedHours} timmar:{selectedMinutes} minuter</Text>
            <TimePicker
            selectedHours={selectedHours}
            selectedMinutes={selectedMinutes}
            onChange={(hours, minutes) => this.setState({ 
              selectedHours: hours, selectedMinutes: minutes 
         })}
        />
          
        <View style={styles.bottom}>
          <BottomLeftButton
            title="Avbryt"
            onPress={() =>
              this.props.navigation.navigate("Home")
            }
          />

          <BottomRightButton
            title="Spara"
            onPress={() =>
              
              this.props.navigation.navigate("Home")
            }
          />
        </View>
      </View>
      
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 35,
    flex: 1,
    left: 10,
    marginTop: "10%",
    //marginBottom: "1%"
  },
  infoText: {
    flex: 5,
    fontSize: 20,
    marginTop: '0%',
    marginBottom: '0%',
    paddingLeft: 10,
    paddingRight: 20
  },
  picker: {
    flex: 9,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: '0%',
    textAlign: 'center'
  
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end"
  }
});


