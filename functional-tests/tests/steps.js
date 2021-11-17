const { goto, text, link, click, button } = require('taiko');
const assert = require('assert');

step('Go to Watchlist website', async function () {
    await goto('http://localhost:3000');
    // await click(button("Logout"));
});

step('See <table>', async function (table) {
    for (let row of table.rows) {
        assert.ok(await text(row.cells[0]).exists());
    }
});

step('Click link <linkText>', async function (linkText) {
    await click(link(linkText));
});

step('Logout', async function () {
    await click(button('Logout'));
    assert.ok(await text('Logged in: false').exists());
});

step('Login <username>', async function (username) {
    assert.ok(await text('Login Page').exists());
    await click(button('Login'));
    assert.ok(await text('Logged in: ' + username).exists());
});

step('See text <expectedText>', async function (expectedText) {
    assert.ok(await text(expectedText).exists());
});
