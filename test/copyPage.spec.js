/**
 * Created by kmarkovych on 19-Apr-17.
 */
import * as cp from '../src/copyPage'
const parser = new DOMParser();

describe('cp.copyPage', () => {
    let doc;
    beforeEach(() => {
        let xhr = new XMLHttpRequest();
        xhr.open('get', '/template/index.html', false);
        xhr.send();
        if (xhr.status != 200) {
            console.error(xhr.status + ': ' + xhr.statusText);
        } else {
            doc = parser.parseFromString(xhr.responseText, "text/html");
        }
    });

    it('should return not empty result', () => {
        cp.copyPage(converted => {
            expect(converted).not.toBe(undefined);
        }, doc);
    });
    it('should not contain any "script" tag', () =>{
        cp.copyPage(converted => {
            const scripts = converted.getElementsByTagName("script");
            expect(scripts.length).toBe(0);
        }, doc)
    });
    it('should not contain any external style', () =>{
        cp.copyPage(converted => {
            const scripts = converted.getElementsByTagName("link");
            expect(scripts.length).toEqual(0);
        }, doc)
    });

    describe('embedStyles', () =>{
        it('should remove all external styles', () =>{
            cp.copyPage(converted => {
                const links = converted.getElementsByTagName("link");
                expect(links.length).toEqual(0);
            }, doc)
        });
        it('should contain STYLE tag', () =>{
            const expectedStyles = doc.getElementsByTagName("style");
            cp.copyPage(converted => {
                const actualStyles = converted.getElementsByTagName("style");
                expect(expectedStyles.length).toBeLessThan(actualStyles.length);
            }, doc)
        });
    });

    describe('removeScripts', () =>{
        it('should remove all SCRIPT tags', () =>{
            cp.copyPage(converted => {
                const actualScripts = converted.getElementsByTagName("script");
                expect(actualScripts.length).toBe(0);
            }, doc)
        });
    });
    describe('removeAnimation', () =>{
        it('should add "no-animation" class on body', () =>{
            cp.copyPage(converted => {
                const body = converted.querySelectorAll("body")[0];
                expect(body.classList).toContain(cp.COPY_PAGE_NO_ANIMATION_CLASSNAME);
            }, doc)
        });
    });
});
