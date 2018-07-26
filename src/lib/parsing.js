const url = require('url');

function getPlayerIdFromUrl(profileUrl) {
  const parsedUrl = url.parse(profileUrl, true);
  return parsedUrl.query.p;
}

module.exports = {
  getPlayerIdFromUrl,
};
