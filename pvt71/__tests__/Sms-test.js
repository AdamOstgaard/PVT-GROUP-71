import 'react-native';
import { geodeticToGrid } from '../utils/geodetic-grid'
import { projectionParams } from '../utils/projection-params'
import { smsSender } from '../utils/SmsSender';
import assert from 'assert';

describe('Sending sms and calculation position', () => {

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