#!/bin/sh

# get resource
echo "neo scraping starts"
PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs /usr/local/bin/casperjs --web-security=no --ssl-protocol=any --ignore-ssl-errors=yes ./neospider.js
echo "neo scraping ends"

# dump into mongo
echo "neo mongo dumping starts"
nodejs ./neodatadumper.js
echo "neo mongo dumping ends"

# dump into mongo
echo "btc mongo dumping starts"
nodejs ./btcspider.js
echo "btc mongo dumping ends"