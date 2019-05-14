import React from 'react';
import { TouchableOpacity, StyleSheet, Image}  from 'react-native';

export default class TimerSleepButton extends React.Component {

    render(){
        return(
            <TouchableOpacity 
                style={styles.button}
                onPress={this.props.onPress}
            >
                <Image source={require('../assets/images/zzz-icon-3.png')}/>
            </TouchableOpacity>
        );
    }
}

const styles= StyleSheet.create({
    button: {
        height: 90,
        width: 90,
    },
    
});