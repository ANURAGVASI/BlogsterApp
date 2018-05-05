const puppeeter = require('puppeteer');

// excecuted before each test suite
//  initialize browser and page and navigate localhost:3000
let browser,page;
beforeEach(async () => {
     browser = await puppeeter.launch({
        headless: true,
        args:["--no-sandbox"]
    });
     page = await browser.newPage();
    await page.goto('http://localhost:3000');
});

// excecuted after each test suite
// close browser window
afterEach(async () => {
    await browser.close();
})

test('check header has correct text', async () => {
    const text =await page.$eval('a.brand-logo',el => el.innerHTML);
    console.log(text);
    expect(text).toEqual('Blogster');
  });

test('clicking login starts Oauth flow',async () => {
    await page.click('.right a');

    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
})