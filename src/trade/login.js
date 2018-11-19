const loginWithCredentials = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://www.marketwatch.com/');

}
