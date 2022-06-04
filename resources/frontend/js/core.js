let body = document.querySelector('body');

window.addEventListener("DOMContentLoaded", () => {
    body.classList.remove('no-js');
});


/* Add Browser Class to HTML */
var browser_name = '';
isIE = /*@cc_on!@*/false || !!document.documentMode;
isEdge = !isIE && !!window.StyleMedia;
if (navigator.userAgent.indexOf("Chrome") != -1 && !isEdge) {
    browser_name = 'chrome';
} else if (navigator.userAgent.indexOf("Safari") != -1 && !isEdge) {
    browser_name = 'safari';
} else if (navigator.userAgent.indexOf("Firefox") != -1) {
    browser_name = 'firefox';
} else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
{
    browser_name = 'ie';
} else if (isEdge) {
    browser_name = 'edge';
} else {
    browser_name = 'other-browser';
}

let html = document.querySelector('html');

html.classList.add(browser_name);
/* End */



