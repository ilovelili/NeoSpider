var casper = require('casper').create({
        verbose: false,
        logLevel: "debug",
    }),    
    config = require('config.json'),
    fs = require('fs'),
    filename = 'neo.json';

// step 1: open url
casper.userAgent(config.useragent);
casper.start(config.url);

casper.then(function () {
    var info = this.evaluate(function () {
        usd = parseFloat($('#quote_price').text().replace('$', '')),
        usdrate = parseFloat($('#quote_price').next().text().replace('(', '').replace(')', '')),
        btc = parseFloat($('#quote_price').next().next().next().text().replace(' BTC', '')),
        btcrate = parseFloat($('#quote_price').next().next().next().next().text().replace('(', '').replace(')', ''));

        return {
            usd: usd,
            usdrate: usdrate,
            btc: btc,
            btcrate: btcrate,
            date: new Date,
        };
    });
    
    fs.write(fs.pathJoin(fs.workingDirectory, 'output', filename), JSON.stringify(info), 'w');
});

/**
 * Event listening
 */
casper.on("remote.message", function (msg) {
    this.echo("remote: " + msg);
});

casper.on("error", function (err) {
    this.echo("error: " + err);
});

// entry
casper.run(function () {
    console.log('All done. Exit');
    this.exit();
});