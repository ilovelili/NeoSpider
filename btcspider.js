var MongoClient = require('mongodb').MongoClient,
    host = process.env.HOST || '188.166.244.244',
    port = process.env.PORT || 27017,
    db = 'neo',
    url = 'mongodb://{{host}}:{{port}}/{{db}}'.replace('{{host}}', host).replace('{{port}}', port).replace('{{db}}', db),
    https = require("https"),
    options = {
        host: 'blockchain.info',
        port: 443,
        path: '/ticker',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    },
    req = https.request(options, function (res) {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
            var obj = JSON.parse(output),
                // only interested in USD
                info = obj['USD'],
                data = {
                    buy: info.buy,
                    sell: info.sell,
                    date: new Date,
                };

            save(data);
        });
    });

req.on('error', function (err) {
    res.send('error: ' + err.message);
});

req.end();

function save(data) {
    MongoClient.connect(url, function (err, db) {
        if (!err) {
            var col = db.collection('btcrates');
            col.insert(data, {
                continueOnError: true,
                keepGoing: true,
                safe: false,
            },
            function (err, result) {
                if (err) {
                    console.error(err);
                }
                db.close();
            });
        }
    });
}

