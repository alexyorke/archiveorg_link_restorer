const metascraper = require("metascraper")([require("metascraper-date")()]);

const fetch = require("node-fetch");
const targetUrl = window.location.href;

function dateToYMDHH(date) {
  var s = date.getSeconds();
  var min = date.getMinutes();
  var h = date.getHours();
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return (
    "" +
    y +
    "" +
    (m <= 9 ? "0" + m : m) +
    "" +
    (d <= 9 ? "0" + d : d) +
    "" +
    (h <= 9 ? "0" + h : h) +
    (min <= 9 ? "0" + min : min) +
    (s <= 9 ? "0" + s : s)
  );
}

if (targetUrl.match(/(.*\.?stackexchange.com)|stackoverflow\.com\//gm)) {
  matchStackExchange();
} else {
  fallbackMetascraper();
}

function matchStackExchange() {
    let answers = document
        .getElementById("answers")
        .getElementsByClassName("answer");

    for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        let answerDate = answer
            .getElementsByTagName("time")[0]
            .getAttribute("datetime");
        let answerLinks = answer.getElementsByTagName("a");
        for (let j = 0; j < answerLinks.length; j++) {
            let answerLink = answerLinks[j].getAttribute("href");
            if (answerLink.startsWith("http")) {
                let archiveurl = "https://web.archive.org/web/" +
                    dateToYMDHH(new Date(answerDate)) +
                    "/" +
                    answerLink;
                answerLinks[j].setAttribute("href", archiveurl);
            }
        }
    }
}

function fallbackMetascraper() {
    (async () => {
        fetch(targetUrl)
            .then((res) => res.text())
            .then((body) => {
                const metadata = metascraper({ url: targetUrl, html: body });
                metadata.then(function (result) {
                    var links = document.getElementsByTagName("a");

                    for (let i = 0; i < links.length; i++) {
                        let archiveurl = "https://web.archive.org/web/" +
                            dateToYMDHH(new Date(result.date)) +
                            "/" +
                            links[i].getAttribute("href");
                        links[i].setAttribute("href", archiveurl);
                    }
                });
            });
    })();
}