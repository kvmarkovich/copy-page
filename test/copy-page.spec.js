/**
 * Created by kmarkovych on 19-Apr-17.
 */
import {helloWorld} from './src/copy-page'
describe('test', function () {
    it('should return "Hello World!"', function () {
        const actual = helloWorld();
        expect(actual).toBe("Hello World!");
    })
});

