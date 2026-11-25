# archiveorg_link_restorer
Change all links in Stack Exchange, Stack Overflow answers to their archive.org snapshot on the date the answer was posted, and news articles/blog posts to the date they were published. This is a Greasemonkey script which can be installed on any major web browser.

![Demo](https://github.com/alexyorke/archiveorg_link_restorer/raw/master/demo.gif)

For example, say you click on a link in a Stack Overflow answer, and it goes to a 404, or the contents of the page has changed drastically. This extension, when activated, will change all links in all answers on a Stack Overflow or Stack Exchange question to go to its archive.org snapshot from the date the answer was posted. Therefore, you will see what the author saw when they posted the link in their answer.

Additionally, any news articles or blog posts links' will be automatically redirected to their archive.org links from when the article was published.

## Downloading

There is a [pre-release](https://github.com/alexyorke/archiveorg_link_restorer/releases) version of the script available. I will be converting it to a Chrome and Firefox extension soon.

## Building

To install dependencies and build the userscript, run:

```
npm install
npm test
```

The build writes an installable userscript to:

```
dist/archiveorg_link_restorer.user.js
```

## CI/CD

GitHub Actions now validates pull requests and pushes by:

- syntax-checking the source
- building the userscript artifact

Published GitHub releases automatically attach the built userscript artifact so the release output matches the local build path.
