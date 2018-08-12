import puppeteer from 'puppeteer';

export const hidereferrer = async ({ url, reftype, keywords = '' }) => {
  if (typeof url !== 'string' && typeof reftype !== 'string') {
    return { error: 'One of the required fields is missing - url, reftype', url: null };
  }
  
  const [page] = await puppeteer.launch().then(browser => browser.pages());
  await page.goto('https://hidereferrer.com');

  const inputUrl = await page.waitForSelector('[name="url"]');
  await inputUrl.type(url, { delay: 20 });
  
  await page.waitForSelector('#reftype');
  await page.click('.glyphicon-globe'); // input url bug fix
  await page.select('#reftype', ['0','1','3','4','5','8','9'].includes(reftype) ? reftype : '0');
  
  const [inputKeywords, button] = await Promise.all([
    page.waitForSelector('#pass'),
    page.waitForSelector('#shortenurl')
  ]);
  
  if (reftype === '3') {
    await inputKeywords.type(keywords);
  }
  
  await button.click();
  const newUrl = await page.waitForSelector('a[target="new"]').then(el => el.getProperty('href'));
  await page.browser().close();
  return { url: await newUrl.jsonValue(), error: null };
};
