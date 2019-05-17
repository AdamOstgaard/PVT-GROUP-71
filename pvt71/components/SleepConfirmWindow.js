import React from 'react';
import { Button, View, Text, StyleSheet, Modal } from 'react-native';


export default class SleepConfirmWindow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          modalVisible: false,
        };
    }
    componentDidUpdate(prevProps){
        if(this.props.isVisible !== prevProps.isVisible && this.props.isVisible){
            this.setState({modalVisible : true});
        }
    }
    
    render(){
        return(
            <View>
                <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() =>{
                        this.setState({modalVisible: false});
                    }}
                >
                    <View styes={styles.container}>
                        <View styles={styles.innerContainer}>
                            <Text>This is a confirmationaa pop up</Text>
                            <Button  title="Stäng" onPress={() => this.setState({modalVisible:false})}/>
                        </View>
                    </View>
                </Modal>   
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1 ,flexDirection: 'column', justifyContent: 'flex-end'
        
    },
    innerContainer: {
        height: "50%" ,width: '100%', backgroundColor:"#fff", justifyContent:"center"
    }
});