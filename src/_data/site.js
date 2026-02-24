const fs = require("fs");
const path = require("path");

const jsonPath = path.join(__dirname, "site.json");
const rawData = fs.readFileSync(jsonPath, "utf-8");
const data = JSON.parse(rawData);

module.exports = {
  title: data.title,
  url: data.url,
  language: data.language,
  description: data.description,
  logo: data.logo,
  defaultImage: data.defaultImage,
  authorName: data.authorName,
  authorEmail: data.authorEmail,
  authorUrl: data.authorUrl,
  year: data.year
};