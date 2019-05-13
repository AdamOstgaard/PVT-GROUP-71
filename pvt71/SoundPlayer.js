import {Audio} from 'expo';

export async function playSound() {
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync(require('./assets/sounds/back2work.wav'));
        await soundObject.playAsync();
    } catch (error) {
        alert(error)
    }
}
