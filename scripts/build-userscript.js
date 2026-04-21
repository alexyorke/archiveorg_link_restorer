const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const headerFile = path.join(rootDir, "userscript.header.js");
const sourceFile = path.join(rootDir, "archiveorg_link_restorer.js");
const distDir = path.join(rootDir, "dist");
const outputFile = path.join(distDir, "archiveorg_link_restorer.user.js");

fs.mkdirSync(distDir, { recursive: true });

const header = fs.readFileSync(headerFile, "utf8").trimEnd() + "\n\n";
const source = fs.readFileSync(sourceFile, "utf8");

fs.writeFileSync(outputFile, header + source);
console.log(`Wrote ${outputFile}`);
