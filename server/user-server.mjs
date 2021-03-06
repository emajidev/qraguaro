import restify from 'restify';
import util from 'util';

import DBG from 'debug';
const log = DBG('users:service');
const error = DBG('users:error');

import corsMiddleware from 'restify-cors-middleware';

import * as usersModel from './users-sequelize';
import * as entrancesModel from './entrances-sequelize';

var server = restify.createServer({
    name:"User-Auth-Service",
    version: "0.0.1"
});


/* CORS */


const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
});
   

/* let corsHandler = function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Expose-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Max-Age', '1000');
    
    return next();
} */

/* server.use(restify.plugins.authorizationParser());
server.use(check); */

server.use(restify.plugins.queryParser());

server.use(restify.plugins.bodyParser({
    mapParams: true
}));
//server.use(corsHandler);
server.pre(cors.preflight);
server.use(cors.actual);

//Admins list, save the token generated by active admins sessions
let activeSessions = [];



//Create a user record
 server.post('/create-user', async (req,res,next) => {
    try {
        let result = await usersModel.create(
            req.params.name, req.params.lastName,
            req.params.cid, req.params.email,
            req.params.telf
        );
        res.send(result);
        next(false); //Detiene la cadena de handlers
    } catch(err) { console.log(err);res.send(500, err); next(false);}
});

//Update an existing user record
 server.post('/update-user', async (req, res, next) => {
    try {
        let result = await usersModel.updateUser(
            req.params.id, req.params.name,
            req.params.lastName, req.params.cid,
            req.params.email, req.params.telf     
        );
        res.send(usersModel.sanitizedUser(result));
        next(false);
    } catch(err){ console.log(err);res.send(500,err); next(false) }
});

//Find a user, if not found create one given profile infromation
/* server.post('/find-or-create', async (req, res, nex) => {
    log('find-or-create ' + util.inspect(req.params));    
    try {
        let result = await usersModel.findOrCreate({
            id: req.params.username, username: req.params.username,
            password: req.params.password, provider: req.params.provider,
            familyName: req.params.familyName, givenName: req.params.givenName,
            middleName: req.params.midleName,
            emails:req.params.emails, photos: req.params.photos
        });
        res.send(result);
        next(false);
    } catch(err) { res.send(500,err); next(false);}
}); */

//Find the user data (doesn't return password)
/* server.get('/find/:username' , async (req, res, next)=>{
    try {
        let user = await usersModel.find(req.params.username);
        if (!user) {
            res.send(404, new Error("Did not find " + req.params.username));
        } else {
            res.send(user);
        }
        next(false);
    }catch(err) {res.send(500, err); next(false);}
}); */

//Delete/destroy a user record
server.post('/delete-user', async (req, res, next) => {
    try {
        let msg = await usersModel.deleteUser(req.params.id);
        res.send(msg);
        next(false);
    } catch(err) { res.send(500,err); next(false);}
});

//Check password 
server.post('/checkQR', async (req, res, next)=>{
    try {
        let check = await usersModel.checkQR(req.params.QR);
        console.log(req.params.name);
        if (check.userId){
            console.log(check.userId);
            await entrancesModel.create(check.userId);
            let newEntrances = await entrancesModel.listEntrances(); 
            check.newEntrances = newEntrances;
        } 
        res.send(check);
        next(false);
    } catch(err) {console.log(err);res.send(500, err); next(false);}
});

//List users
server.get('/list', async (req, res, next)=>{
    try {
        let userList = await usersModel.listUsers();
        if (!userList) userList = [];

        res.send(userList);
        next(false);
    } catch(err) { res.send(500, err); next(false);}
});

//List entrances 
server.get("/entrances-list", async (req, res, next) => {
    try {
        let entrancesList = [];
        entrancesList = await entrancesModel.listEntrances();
        console.log("ENVIANDO ENTRANCES LIST");
        res.send(entrancesList);
    } catch(e) {res.send(500, err); next(false);}
});

//Check admin credentials 
server.post('/login', async (req, res, next)=>{
    try {
        console.log(req.params);
        let check = await usersModel.login(req.params);
        console.log("check result: " + check.result);
        if (check.result){
            //Generate a random token for this session
            check.token = generateToken();
            console.log("Token generate: " + check.token);
            activeSessions.push(check.token);
        }
        res.send(check);
        next(false);
    } catch(err) {console.log(err);res.send(500, err); next(false);}
});

//Remove token
server.post('/logout', async (req, res, next)=>{
    try {
        console.log(req.params);
        let deleted = false;
        let msg = "";
        if (req.params.token) {
            if (activeSessions.length > 0){
                for (let index = 0; index < activeSessions.length; index++) {
                    const existingToken = activeSessions[index];
                    if (req.params.token == existingToken) {
                        activeSessions.splice(index,1);
                        deleted = true;
                        msg = "Sesion cerrada exitosamente"
                    }
                }
            } else {
                deleted = true; //No existen sesiones activas
                msg = "Error, no existen sesiones activas"
            }
        }
        console.log(activeSessions);
        res.send({deleted, msg});
        next(false);
        
    } catch(err) {console.log(err);res.send(500, err); next(false);}
});

server.listen(process.env.PORT, "10.0.32.44", function(){
    log(server.name + " listening at " + server.url);
});

function generateToken() {
    
    'use strict';
    
    var chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        
        serialLength = 10,
        
        randomSerial = "",
        
        i,
        
        randomNumber;
    
    for (i = 0; i < serialLength; i = i + 1) {
        
        randomNumber = Math.floor(Math.random() * chars.length);
        
        randomSerial += chars.substring(randomNumber, randomNumber + 1);
        
    }
    
    return randomSerial;
    
}

server.on('uncaughtException', function (req, res, route, err) {
    console.log('uncaughtException', err.stack);
});