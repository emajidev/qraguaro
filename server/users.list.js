'use strcit';

const util = require('util');
const restify = require('restify-clients');

var client = restify.createJsonClient({
    url: 'http://10.0.32.44:'+ process.env.PORT,
    version:'*'
});



client.get('/list', 
    (err,req, res, obj) =>{
        if (err) console.log(err.stack);
        else console.log('Found ' + util.inspect(obj))
    });
