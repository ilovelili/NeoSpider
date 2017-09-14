#!/bin/sh

# get resource
echo "scraping starts"
PHANTOMJS_EXECUTABLE=/usr/local/bin/phantomjs /usr/local/bin/casperjs --web-security=no --ssl-protocol=any --ignore-ssl-errors=yes ./neospider.js
echo "scraping ends"

# dump into mongo
echo "mongo dumping starts"
nodejs ./neodatadumper.js
echo "mongo dumping ends"