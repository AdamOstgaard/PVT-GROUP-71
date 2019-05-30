import 'react-native';
import { geodeticToGrid } from '../utils/geodetic-grid'
import { projectionParams } from '../utils/projection-params'
import { smsSender } from '../utils/SmsSender';
import assert from 'assert';
import MockStorage from '../__mocks__/mockStorage';

const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);
jest.setMock('AsyncStorage', AsyncStorage);

describe('Sending sms and calculation position', () => {

  beforeEach( async () => {
    let contactPerson = {
      firstName: "foo",
      lastName: "bar",
      number: 79584,
    }
    await AsyncStorage.setItem("contact", JSON.stringify(contactPerson));

    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: function() {
            return {ok: true}
          }
        });
      });
      return p;
  });
  });

    it('it calculates position', async () => {
        let position = await smsSender.contactEmergencyContact();
        assert.equal(true, position.includes("This is a call for help. "));
    });

    it('it converts correctly', async () => {
        var x = 59.392542;
        var y = 17.906583;
        var params = projectionParams('sweref991800');
        var geo = geodeticToGrid(x, y, params);
        assert.equal(geo.x, 6586401);
        assert.equal(geo.y, 144692);
    });


    it('it handles defaultParams', async () => {
        var x = 59.392542;
        var y = 17.906583;
        var params = projectionParams('defaultParam');
        var geo = geodeticToGrid(x, y, params);
        var geo = geodeticToGrid(x, y, params);
        assert.equal(geo.x, null);
        assert.equal(geo.y, null);
    });
});
