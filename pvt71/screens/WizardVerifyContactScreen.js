import React from "react";
import AppSingleButton from "../components/AppSingleButton";
import { Animated, Dimensions, Keyboard, UIManager ,StyleSheet, Text, View, TextInput, AsyncStorage } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const { State: TextInputState } = TextInput;
export default class WizardVerifyContactScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '', 
      number: '',
      shift: new Animated.Value(0),
    };
  }
  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }
  render() {
    const { shift } = this.state;
    return (
      <Animated.View style={[styles.container, { transform: [{translateY: shift}] }]}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Lägg till kontaktperson</Text>
          <Text style={styles.infoText}>
            Du kan alltid ändra och lägga till kontakpersoner senare under inställningar 
          </Text>
        </View>
        <View style = {styles.nameContainer}>
          <Text style = {styles.infoText}>Namn: </Text>
          <TextInput style={styles.textInput}
          placeholder="Ange namn här!"
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          />
        </View>
        <View style = {styles.numberContainer}>
          <Text style={styles.infoText}>Telefonnummer: </Text>
          <TextInput style={styles.textInput}
          placeholder="ange nummer här!"
          onChangeText={(number) => this.setState({number})}
          value={this.state.number}
        />
        </View>
        <View style={styles.bottom}>
          <AppSingleButton
            title="Nästa"
            onPress={() => {
              this.saveSettings();
              this.props.navigation.navigate("WizardSettingsScreen");
            }}
          />
        </View>
      </Animated.View>
    );
  }
  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        this.state.shift,
        {
          toValue: gap,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start();
    });
  }
  handleKeyboardDidHide = () => {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }


  async saveSettings() {
    let contactPerson = {
      name: this.state.name,
      number: this.state.number
    }
    try {
      await AsyncStorage.setItem("contact", JSON.stringify(contactPerson));
    } catch (error) {

    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight(),
    flex: 1,
    backgroundColor: "#fff"
  },
  headerContainer: {
    alignItems:'flex-start',
    marginBottom: 10
  },
  headerText: {
    fontSize: 30,
    justifyContent: "flex-start",
    left: 10,
  },

  nameContainer:{
    marginTop: 20,
    marginBottom: 20,
    alignItems:'flex-start',
    
  },
  numberContainer:{
    alignItems:'flex-start',
  
    
  },
  infoText: {
    fontSize: 20,
    paddingLeft: 10
  },
  textInput: {
    height: 60,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
    width: "90%",
    borderColor: 'gray',
    borderWidth: 1
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end"
  }
});