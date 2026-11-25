const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const script = fs.readFileSync('dist/archiveorg_link_restorer.user.js','utf8');
function link(href) {
  return {href, getAttribute(){return this.href}, setAttribute(_,value){this.href=value}};
}
const articleLink=link('https://example.org/a'), internal=link('/about');
const date={getAttribute(){return '2022-03-04T12:34:56'}};
function run(href,document){vm.runInNewContext(script,{window:{location:new URL(href)},document})}
run('https://news.example/',{querySelector(){return date},getElementsByTagName(){return [articleLink,internal]}});
assert.equal(articleLink.href,'https://web.archive.org/web/20220304123456/https://example.org/a');
assert.equal(internal.href,'/about');
run('https://news.example/',{querySelector(){return null}});
const answerLink=link('https://example.org/b');
const answer={getElementsByTagName(tag){return tag==='time'?[date]:[link(null), answerLink]}};
run('https://stackoverflow.com/questions/1',{getElementById(){return {getElementsByClassName(){return [{getElementsByTagName(){return []}}, answer]}}}});
assert.equal(answerLink.href,'https://web.archive.org/web/20220304123456/https://example.org/b');
run('https://stackoverflow.com/',{getElementById(){return null}});
console.log('All artifact smoke cases passed');
