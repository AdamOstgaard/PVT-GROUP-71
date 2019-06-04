import {AsyncStorage} from 'react-native';
import {moment} from 'moment';

export async function getSleepTimeSettings() {
    try {
      const newSleepTime = await AsyncStorage.getItem("sleeptime");
      const s = JSON.parse(newSleepTime);
      const start = s.startTime;
      const end = s.endTime;

      return { start, end }
    } catch (error) {
      //console.log(error.message);
    }
  }

export async function getDurationSettings() {
    try {
      const duration = await AsyncStorage.getItem("time") || moment.duration(1, "h").asMilliseconds();
      const warning = await AsyncStorage.getItem("warning") || moment.duration(1, "h").asMilliseconds();
      const d = JSON.parse(duration);
      const w = JSON.parse(warning);
    return { duration: d, warningTime: w};
    } catch (error) {}
  }