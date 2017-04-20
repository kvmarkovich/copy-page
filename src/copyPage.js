/**
 * Created by kmarkovych on 19-Apr-17.
 */

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

export const COPY_PAGE_NO_ANIMATION_CLASSNAME = 'no-animation';
/**
 * Retrieves external styles and embeds the into document
 * @param {document} clonedDoc
 * @return {document}
 */
let embedStyles = function (clonedDoc) {
    let linkElementsList = clonedDoc.getElementsByTagName("link");
    let embeddedStyles = '';
    for (let index = 0; index < linkElementsList.length; index++) {
        let style = linkElementsList.item(index);
        if (style.type !== "text/css") {
            continue;
        }
        const xhr = new XMLHttpRequest();
        xhr.open('GET', style.href, false);
        xhr.send();

        if (xhr.status === 200) {
            embeddedStyles.concat("\n").concat(xhr.responseText);
        }
        else {
            console.error("Request " + style.href + " failed.  Returned status of " + xhr.status);
        }
    }
    const style = document.createElement('style');
    style.text = embeddedStyles;
    clonedDoc.appendChild(style);
    return clonedDoc;
};

/**
 * Removes all 'script' tags from document
 * @param {document} clonedDoc
 * @returns {document}
 */
let removeScripts = function (clonedDoc) {
    const scripts = clonedDoc.querySelectorAll('script');
    for (var i = 0; i < scripts.length; i++) {
        scripts[i].remove();
    }
    return clonedDoc;
};

/**
 * Adds 'no-animation' class on document
 * @param {document} clonedDoc
 * @returns {document}
 */
let removeAnimation = function (clonedDoc) {
    clonedDoc.classList.add(COPY_PAGE_NO_ANIMATION_CLASSNAME);
    return clonedDoc;
};
/**
 * Copies page, embeds all resources into it and return it into callback
 * @param {callback} callback retrieves processed html string
 */
export function copyPage(callback) {
    return Observable.of(document.documentElement.cloneNode(true))
        .map(clonedDoc => removeAnimation(clonedDoc))
        .map(clonedDoc => removeScripts(clonedDoc))
        .map(clonedDoc => embedStyles(clonedDoc))
        .map(clonedDoc => {
            return clonedDoc;
        })
        .subscribe(res => {
            callback(res);
            return res;
        });
}

/**
 * This callback retrieves processed html string
 * @callback callback
 * @param {Node} parsedPage prepared html page
 */
