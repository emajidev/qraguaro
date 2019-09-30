'use strict';

const util = require('util');
const restify = require('restify-clients');

var client = restify.createJsonClient({
    url: 'http://10.0.32.44:'+ process.env.PORT,
    version: "*"
});

/* client.basicAuth('them', 'D4ED43C0-8BD6-4FE2-B358-7C0E230D11EF' ); */

client.post('/checkQR', {
    QR: "V24478786"
},
(err, req, res, obj) => {
    if (err) console.error(err.stack);
    else console.log('Checked at ' + util.inspect(obj));
});
