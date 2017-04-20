/**
 * Created by kmarkovych on 19-Apr-17.
 */
import {copyPage} from '../src/copyPage'

describe('copy-page', () => {
    it('should return not empty result', () => {
        copyPage(converted => {
            expect(converted).not.toBe(undefined);
        });
    });
    it('should not contain any "script" tag', function () {
        copyPage(function (converted) {
            const scripts = converted.getElementsByTagName("script");
            expect(scripts.length).toBe(0);
        })
    });
});

