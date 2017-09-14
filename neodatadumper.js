var MongoClient = require('mongodb').MongoClient,
    host = process.env.HOST || '188.166.244.244',
    port = process.env.PORT || 27017,
    db = 'neo',
    url = 'mongodb://{{host}}:{{port}}/{{db}}'.replace('{{host}}', host).replace('{{port}}', port).replace('{{db}}', db),
    fs = require('fs'),
    path = require('path'),
    filename = path.join(process.cwd(), 'output', 'neo.json'),
    readFile = function () {
        return JSON.parse(fs.readFileSync(filename, 'utf-8'));
    },
    unlinkFile = function () {
        fs.unlink(filename);
    };

MongoClient.connect(url, function (err, db) {
    if (!err) {
        var col = db.collection('rates');
        col.insert(readFile(), {
            continueOnError: true,
            keepGoing: true,
            safe: false,
        },
        function (err, result) {
            if (err) {
                console.error(err);
            }
            db.close();
            unlinkFile();
        });
    }
});

