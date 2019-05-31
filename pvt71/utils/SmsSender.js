import { Location } from "expo";
import { geodeticToGrid } from '../utils/geodetic-grid'
import { projectionParams } from '../utils/projection-params'
import { AsyncStorage } from "react-native";

var smsSender = (function () {
    return {
      contactEmergencyContact: async function() {
        let link = "This is a call for help. "; //TODO: Resonable text for message
        link += await getPosition();
        await sendSms(link);
        return link; //For testing purposes*/
      }
    }

    async function getPosition() {
        let link
        try {
            var pos = await position();
            let params = projectionParams('sweref991800');
            let geo = geodeticToGrid(pos.coords.latitude, pos.coords.longitude, params);
            link = "http://openmap.stockholm.se/bios/dpwebmap/cust_sth/sbk/openmap/DPWebMap.html?zoom=9&lat=" + geo.x + "&lon=" + geo.y + "&layers=TTT00000000B00000T";
        } catch (e) {
            link = "";
        }
        return link;
    };

    function position() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Location.getCurrentPositionAsync())
            }, 2000);
        });
    };

    async function sendSms(message) {
      let contact = await AsyncStorage.getItem("contact");
      const p = JSON.parse(contact);
      let number = p.number;
      let data = { message, number };
      fetch('https://pvt-test-backend.adamostgaard.now.sh/smsApi.js',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                method: 'POST', body: JSON.stringify(data)
            })
    };
}())

export { smsSender }
