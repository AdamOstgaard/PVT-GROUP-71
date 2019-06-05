import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import AppSingleButton from "../components/AppSingleButton";
import {Permissions} from "expo";

export default class WizardWelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  handlePress()  {
    Permissions.askAsync(Permissions.LOCATION),
    this.props.navigation.navigate("WizardVerifyContactScreen");
}

  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Välkommen!</Text>

        <Text style={styles.infoText}>
          {""}
          Innan du kan börja använda applikationen behöver du sätta några grundläggande
          inställningar som nödkontakt, timerintervall och varningstimerintervall.
          Du behöver också ge applikationen godkännande för att kunna använda sig av din position via GPS.
          Ingen kommer att ha tillgång till din data förutom i eventuella nödsituationer då din position kan skickas till din nödkontakt.
        </Text>
        </ScrollView>
        <View style={styles.bottom}>
          <AppSingleButton
            title="Nästa"
            onPress={this.handlePress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 35,
    //flex: 1,
    justifyContent: "flex-start",
    left: 10,
    marginTop: 50
  },
  infoText: {
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: "5%",
    paddingBottom: "60%",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end"
  }
});
