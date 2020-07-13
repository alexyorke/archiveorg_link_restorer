// ==UserScript==
// @name         StackExchange Archive.org link restorer
// @namespace    https://github.com/alexyorke/
// @version      0.1
// @description  Replace stackoverflow.com and *.stackexchange.com answer URLs with archive.org ones based on the archive.org snapshot of when the answer was posted
// @author       Alex Yorke
// @match        *://*.stackoverflow.com/questions/*
// @match        *://*.stackexchange.com/questions/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function dateToYMDHH(date) {
    var s = date.getSeconds();
    var min = date.getMinutes();
    var h = date.getHours();
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '' + (m <= 9 ? '0' + m : m) + '' + (d <= 9 ? '0' + d : d) + '' + (h <= 9 ? '0' + h : h) + (min <= 9 ? '0' + min : min) + (s <= 9 ? '0' + s : s);
}

let answers = document.getElementById("answers").getElementsByClassName("answer");

for (var i = 0; i < answers.length; i++) {
    let answer = answers[i];
    let answerDate = answer.getElementsByTagName("time")[0].getAttribute("datetime");
    let answerLinks = answer.getElementsByTagName("a");
    for (var j = 0; j < answerLinks.length; j++) {
        let answerLink = answerLinks[j].getAttribute("href");
        if (answerLink.startsWith("http")) {
            let archiveurl = "https://web.archive.org/web/" + dateToYMDHH(new Date(answerDate)) + "/" + answerLink;
			answerLinks[j].setAttribute("href", archiveurl);
        }
    }
}
})();
