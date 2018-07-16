function getPlayerIdFromUrl(url) {
  const parsedUrl = new URL(url);
  return parsedUrl.searchParams.get('p');
}

module.exports = {
  getPlayerIdFromUrl,
};
