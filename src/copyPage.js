/**
 * Created by kmarkovych on 19-Apr-17.
 */

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

export const COPY_PAGE_NO_ANIMATION_CLASSNAME = 'no-animation';
/**
 * Retrieves external styles and embeds the into document
 * @param {Document} clonedDoc
 * @return {Document}
 */
let embedStyles = function (clonedDoc) {
    let linkElementsList = clonedDoc.querySelectorAll('link');
    let embeddedStyles = '';
    for (let index = linkElementsList.length - 1; index > 0; index--) {
        let link = linkElementsList.item(index);
        if (link.type !== 'text/css') {
            continue;
        }
        const xhr = new XMLHttpRequest();
        xhr.open('GET', link.href, false);
        xhr.send();

        if (xhr.status === 200) {
            embeddedStyles.concat('\n').concat(xhr.responseText);
        } else {
            // console.debug("Request " + link.href + " failed.  Returned status of " + xhr.status);
        }
    }
    for (let i = linkElementsList.length - 1; i >= 0; i--) {
        linkElementsList[i].parentNode.removeChild(linkElementsList[i]);
    }
    const style = document.createElement('style');
    style.text = embeddedStyles;
    clonedDoc.getElementsByTagName('head')[0].appendChild(style);
    return clonedDoc;
};

/**
 * Removes all 'script' tags from document
 * @param {Document} clonedDoc
 * @returns {Document}
 */
let removeScripts = function (clonedDoc) {
    const scripts = clonedDoc.querySelectorAll('script');
    for (let i = 0; i < scripts.length; i++) {
        scripts[i].parentElement.removeChild(scripts[i]);
    }
    return clonedDoc;
};

/**
 * Adds 'no-animation' class on document
 * @param {Document} clonedDoc
 * @returns {Document}
 */
let removeAnimation = function (clonedDoc) {
    clonedDoc.querySelector('body').classList.add(COPY_PAGE_NO_ANIMATION_CLASSNAME);
    return clonedDoc;
};

/**
 * Embeds url into stylesheets using dataurl
 * @param {Document} clonedDoc
 * @returns {Document}
 */
let embedUrlsIntoStyles = function (clonedDoc) {
    return clonedDoc;
};


/**
 * Copies page, embeds all resources into it and return it into callback
 * @param {callback} callback retrieves processed html string
 * @param {Document} htmlHtmlElement that will be processed
 */
export function copyPage(callback, htmlHtmlElement) {
    if (!htmlHtmlElement) {
        htmlHtmlElement = document;
    }
    return Observable.of(htmlHtmlElement.documentElement.cloneNode(true))
        .map(clonedDoc => removeAnimation(clonedDoc))
        .map(clonedDoc => removeScripts(clonedDoc))
        .map(clonedDoc => embedStyles(clonedDoc))
        .map(clonedDoc => embedUrlsIntoStyles(clonedDoc))
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
