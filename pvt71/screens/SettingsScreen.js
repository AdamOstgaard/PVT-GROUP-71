import React from "react";
import { StyleSheet, Text, View, ScrollView} from "react-native";
import AppSingleButton from "../components/AppSingleButton";

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <View style = {styles.container}>
        <ScrollView style = {styles.scrollContainer}>
          <AppSingleButton 
          style={styles.topButton}
          textStyle={styles.textTop} 
          title ="Tillbaka"
            onPress={() => 
              this.props.navigation.navigate("HomeScreen",{})}
          ></AppSingleButton>
          <Text style ={styles.category}>Timerinställningar</Text>
          
          <AppSingleButton 
          style={styles.linkButton} 
          textStyle ={styles.text}
          title="Redigera tidsintervall"
            onPress={() => 
              this.props.navigation.navigate("HomeScreen",{})}
          ></AppSingleButton>
          
          <AppSingleButton 
          style={styles.linkButton} 
          textStyle ={styles.text}
          title="Redigera varningsintervall"
            onPress={() => 
              this.props.navigation.navigate("HomeScreen",{})}
          ></AppSingleButton>
          
          <AppSingleButton 
          style={styles.linkButton}
          textStyle ={styles.text}
          title="Redigera sömntider"
            onPress={() => 
              this.props.navigation.navigate("HomeScreen",{})}
          ></AppSingleButton>
          <Text style ={styles.category}>Kontaktpersoner</Text>
          
          <AppSingleButton 
          style={styles.linkButton} 
          textStyle ={styles.text}
          title="Lägg till kontaktperson"
            onPress={() => 
              this.props.navigation.navigate("HomeScreen",{})}
          ></AppSingleButton>
          
          <AppSingleButton 
          style={styles.linkButton}
          textStyle ={styles.text} 
          title="Ta bort kontaktperson"
            onPress={() => 
              this.props.navigation.navigate("HomeScreen",{})}
          ></AppSingleButton>
          
          <AppSingleButton 
          style={styles.linkButton} 
          textStyle ={styles.text}
          title="Redigera kontaktperson"
            onPress={() => 
              this.props.navigation.navigate("HomeScreen",{})}
          ></AppSingleButton>
          
          <Text style ={styles.category}>Övrigt</Text>
          
          <AppSingleButton 
          style={styles.linkButton} 
          textStyle ={styles.text}
          title="Ändra storlek"
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
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingTop: "10%",
  },
  topButton: {
    width:"100%",
    

  },
  category: {
    fontWeight: 'bold',
    fontSize: 32,
    textDecorationLine: 'underline',
    
  },
  linkButton: {
    fontSize: 20,
    color: "#000",
    backgroundColor: "#fff",
    width:"100%",
    borderColor: "#000",
    borderWidth: 0.5
  },
  text: {
    fontSize: 20,
    color: "black",
    paddingRight: 10,
    paddingTop: 8,
    textAlign: 'left'
  },
  textTop: {
    fontSize: 30,
    color: "#fff",
    paddingRight: 10,
    paddingTop: 8,
    textAlign: 'left'


  }

});
