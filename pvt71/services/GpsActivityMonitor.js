
import {Location, Permissions} from "expo";
export default class GpsActivityMonitor{
    lastActive = 0;


    startMonitor (){
        Permissions.askAsync(Permissions.LOCATION).then(() =>{
            let options = {
                timerInterval: 1000,
                distanceInterval: 3,
                accuracy: 6

              };
              
              id = Location.watchPositionAsync(options, () =>{
                lastActive = Date()
                alert(lastActive);
              }); 
        });

      
    }

    
   


}
