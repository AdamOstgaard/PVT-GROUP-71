import React from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import { Timer } from "../components/Timer";
import TimerSleepButton from "../components/TimerSleepButton";
import moment from "moment";
import { playSound } from "../SoundPlayer";
import {Location, Permissions} from "expo";
import { geodeticToGrid, gridToGeodetic } from '../utils/geodetic-grid'
import { projectionParams } from '../utils/projection-params'
import { latToDms, lngToDms } from '../utils/latlng-convert'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerPaused: false
    };
  }
  static navigationOptions = {
    header: null
  };

  render() {
    let pauseText;
    if (this.state.timerPaused) {
      pauseText = "VILOLÄGET ÄR PÅ";
    } else {
      pauseText = "VILOLÄGET ÄR AV";
    }

    return (
      <View style={styles.container}>
        <Text style={styles.sleepOnText}>{pauseText}</Text>
        <View style={styles.timerContainer}>
          <Timer
            onReset={reset => {
              this.setState({ timerPaused: reset });
            }}
            paused={this.state.timerPaused}
            style={styles.timer}
            startTime={moment.duration(1, "s").asMilliseconds()}
            callback={restart => {
              playSound();
              showRestartAlert(restart);
            }}
          />
        </View>
        <View style={styles.sleepButtonContainer}>
          <TimerSleepButton
            onResume={this.state.timerPaused}
            onToggle={enabled => this.setState({ timerPaused: enabled })}
          />
        </View>
      </View>
    );
  }
}

const showRestartAlert = restart => {
  Alert.alert(
    "Timer",
    "Are you ok?",
    [
      { text: "Yes, I'm Ok", onPress: () => restart() },
      { text: "No, I need help!", onPress: () => contactEmergencyContact(), //sendSms(),
        style: "cancel"
      }
    ],
    { cancelable: false }
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff"
  },
  timerContainer: {
    paddingTop: "10%",
    alignItems: "center"
  },
  sleepButtonContainer: {
    left: 240
  },
  sleepOnText: {
    marginTop: "30%",
    alignSelf: "center",
    fontSize: 18
  }
});


function contactEmergencyContact(){
  Permissions.askAsync(Permissions.LOCATION);
  getSWEREFPosition();
}

function getSWEREFPosition() {
  let pos = Location.getCurrentPositionAsync();
  let params = projectionParams('sweref991800');
  pos.then(
    function(p){
      let geo = geodeticToGrid(p.coords.latitude, p.coords.longitude, params);
      sendSms(geo.x, geo.y);
    },() => {
        console.log("Could not resolve position.");
      });
};

function sendSms(x, y){
  let link = "http://openmap.stockholm.se/bios/dpwebmap/cust_sth/sbk/openmap/DPWebMap.html?zoom=9&lat=" + x + "&lon=" + y + "&layers=TTT00000000B00000T";
  let data = {message: link, number: "+46708557411"}
  fetch('https://pvt-test-backend.adamostgaard.now.sh/smsApi.js',
  {
   method: 'POST',
   headers: {
       'Content-Type': 'application/json',
       //'Content-Type': 'application/x-www-form-urlencoded',
   },
   method: 'POST', body: JSON.stringify(data)
 })
}
