// convert history DOM to JSON
// check pending orders?
// check current holdings

const convertHistory = async (page, url) => {
  await page.goto(url);
  // find download url
  const csvUrl = await page.evaluate(() => $('.element--table .transactions');

  // .element--table transactions
//   const res = await this.page.evaluate(() =>
// {
//     return fetch('https://example.com/path/to/file.csv', {
//         method: 'GET',
//         credentials: 'include'
//     }).then(r => r.text());
// });
  // get CSV
  // convert CSV
  // return outputted as array of objects
  console.log(url);

}

module.exports = {
  convertHistory,
}
