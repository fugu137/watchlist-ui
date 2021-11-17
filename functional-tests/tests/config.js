const { openBrowser, closeBrowser } = require('taiko');

const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
});

afterSuite(async () => {
    await closeBrowser();
});
