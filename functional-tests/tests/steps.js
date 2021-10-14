const { goto, openBrowser, closeBrowser, text, link, click, button } = require("taiko");
const assert = require("assert");

const headless = process.env.headless_chrome.toLowerCase() === "true";


beforeSuite(async () => {
    await openBrowser({
        headless: headless
    })
});

afterSuite(async () => {
    await closeBrowser();
});



step("Go to Watchlist website", async function() {
    await goto("http://localhost:3000");
    // await click(button("Logout"));
});

step("See <table>", async function(table) {
    for (let row of table.rows) {
        assert.ok(await text(row.cells[0]).exists());
    }
});

step("Click link <linkText>", async function(linkText) {
    await click(link(linkText));
});

step("Logout", async function() {
    await click(button("Logout"));
    assert.ok(await text("Logged in: false").exists());
});

step("Login", async function() {
    assert.ok(await text("Login Page").exists());
    await click(button("Login"));
    assert.ok(await text("Logged in: true"));
});

step("See text <expectedText>", async function(expectedText) {
    assert.ok(await text(expectedText).exists());
});