const hostname = window.location.hostname;
const publishedDateSelectors = [
  ['meta[property="article:published_time"]', "content"],
  ['meta[name="article:published_time"]', "content"],
  ['meta[property="og:published_time"]', "content"],
  ['meta[name="pubdate"]', "content"],
  ['meta[name="publishdate"]', "content"],
  ['meta[name="timestamp"]', "content"],
  ['meta[itemprop="datePublished"]', "content"],
  ['time[datetime]', "datetime"],
];

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

if (/(^|\.)(stackexchange|stackoverflow)\.com$/i.test(hostname)) {
  matchStackExchange();
} else {
  matchPublishedDate();
}

function matchStackExchange() {
    const container = document.getElementById("answers");
    if (!container) return;

    const answers = container.getElementsByClassName("answer");
    for (const answer of answers) {
        const time = answer.getElementsByTagName("time")[0];
        const answerDate = time && time.getAttribute("datetime");
        if (!answerDate || Number.isNaN(Date.parse(answerDate))) continue;
        let answerLinks = answer.getElementsByTagName("a");
        for (let j = 0; j < answerLinks.length; j++) {
            let answerLink = answerLinks[j].getAttribute("href");
            if (answerLink && answerLink.startsWith("http")) {
                let archiveurl = "https://web.archive.org/web/" +
                    dateToYMDHH(new Date(answerDate)) +
                    "/" +
                    answerLink;
                answerLinks[j].setAttribute("href", archiveurl);
            }
        }
    }
}

function matchPublishedDate() {
    const publishedDate = findPublishedDate(document);

    if (!publishedDate) {
        return;
    }

    var links = document.getElementsByTagName("a");

    for (let i = 0; i < links.length; i++) {
        let href = links[i].getAttribute("href");
        if (!href || !href.startsWith("http")) {
            continue;
        }

        let archiveurl = "https://web.archive.org/web/" +
            dateToYMDHH(publishedDate) +
            "/" +
            href;
        links[i].setAttribute("href", archiveurl);
    }
}

function findPublishedDate(rootDocument) {
    for (let i = 0; i < publishedDateSelectors.length; i++) {
        let selector = publishedDateSelectors[i][0];
        let attribute = publishedDateSelectors[i][1];
        let element = rootDocument.querySelector(selector);

        if (!element) {
            continue;
        }

        let value = element.getAttribute(attribute) || element.textContent;
        let parsedDate = new Date(value);

        if (!Number.isNaN(parsedDate.getTime())) {
            return parsedDate;
        }
    }

    return null;
}
