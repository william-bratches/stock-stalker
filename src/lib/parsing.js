const url = require('url');

function getPlayerIdFromUrl(profileUrl) {
  const parsedUrl = url.parse(profileUrl);
  return parsedUrl.query.p;
}

module.exports = {
  getPlayerIdFromUrl,
};
