# archiveorg_link_restorer
Change all links in Stack Exchange, Stack Overflow answers to their archive.org snapshot on the date the answer was posted, and news articles/blog posts to the date they were published. This is a Greasemonkey script which can be installed on any major web browser.

![Demo](https://github.com/alexyorke/archiveorg_link_restorer/raw/master/demo.gif)

For example, say you click on a link in a Stack Overflow answer, and it goes to a 404, or the contents of the page has changed drastically. This extension, when activated, will change all links in all answers on a Stack Overflow or Stack Exchange question to go to its archive.org snapshot from the date the answer was posted. Therefore, you will see what the author saw when they posted the link in their answer.

Additionally, any news articles or blog posts links' will be automatically redirected to their archive.org links from when the article was published.

## Building

To create the Greasemonkey script, run:

```
npm install -g browserify
npm install
browserify archiveorg_link_restorer.js > bundle.js
```

Then, append the header:

```
// ==UserScript==
// @name         StackExchange/Stack Overflow/news articles archive.org link restorer
// @namespace    https://github.com/alexyorke/
// @version      0.1
// @description  Replace stackoverflow.com and *.stackexchange.com answer URLs with archive.org ones based on the archive.org snapshot of when the answer was posted, and replace links in news articles with those based on when the article was published
// @author       Alex Yorke
// @match        *://*/*
// @grant        none
// ==/UserScript==
```
