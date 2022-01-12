const { goto, text, link, click, button, into, textBox, write } = require('taiko');
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

step('Go to <linkText>', async function (linkText) {
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

step('Search for and add <movieTitle> (<year>)', async function (movieTitle, year) {
    const movieDetails = `${movieTitle} (${year})`;

    await click(textBox({ placeholder: 'Search for a movie to add to your watchlist...' }));
    await write(movieTitle);
    await click(button('Search'));

    assert.ok(await text(movieDetails).exists());
    await click(movieDetails);
});
