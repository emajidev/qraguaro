import Sequelize from "sequelize";
import jsyaml from "js-yaml";
import fs from "fs-extra";
import util from "util";
import DBG from "debug";
import { finished } from "stream";

const log = DBG('users:model-users');
const error = DBG('users:error');

var SQUser;
var squelz;

export async function connectDB(){
    
    if (SQUser) { return SQUser.sync();}
    
    
    const yamltext = await fs.readFile(process.env.SEQUELIZE_CONNECT, 'utf8');

    const params = await jsyaml.safeLoad(yamltext, 'utf8');
    
    if (!squelz) squelz = new Sequelize(
        params.dbname, 
        params.username,
        params.password, 
        params.params
    );

    if (!SQUser) SQUser = squelz.define( 'Users' , {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        name: Sequelize.STRING,
        lastName: Sequelize.STRING,
        cid: Sequelize.STRING,
        telf: Sequelize.STRING,
        email: Sequelize.STRING
    });
    return SQUser.sync();
}

export async function checkQR(QR){
    const SQUser = await connectDB();
    const userList = await SQUser.findAll({});
    //Toma la lista de usuarios y compara el CID de cada usuario con el QR
    if(userList.length > 0){
        for (let index = 0; index < userList.length; index++) {
            let user = userList[index];
            if (!user.cid) continue;

            if (QR.indexOf(user.cid) > 0){
                return { check: true,  userId:user.id , name: user.name, lastName: user.lastName, cid: user.cid, message: "Codigo QR registrado" };
            }
                
        }
    } else {
        return { check: false,  message: "No existen usuarios en la BD" }; 
    }
    return { check: false,  message: "Codigo QR no registrado" }; 
}

export async function login(credentials){
   // const SQUser = await connectDB();
   // const userList = await SQUser.findAll({});
   let userAdmin = {
       username: "comprotic",
       password: "123"
   };
   if (credentials.username == userAdmin.username && credentials.password == userAdmin.password){
    return { result: true}; 
   } 
   return { result: false }; 
}

 export async function create(name, lastName, cid, email, telf) {
    const SQUser = await connectDB();
    return SQUser.create({
        name, 
        lastName, 
        cid,
        email, telf
    });
}

 export async function updateUser( id, name, lastName, cid, email, telf) {
    const user = await findUser(id);
    console.log(user);
    return user ? user.updateAttributes({
        name, lastName, cid, email, telf
    }) : undefined;
} 


export async function findUser(id) {
    const SQUser = await connectDB();
    const user = await SQUser.findOne({where: {id}});
    const ret = user ? user: undefined;
    return ret;
}

export async function userPasswordCheck( username, password) {
    const SQUser = await connectDB();
    try {
        const user = await SQUser.findOne({ where: { username: username}});
        if (!user) {
            return { check: false, username: username, message: "Could not find user" };
        }
        else if ( user.username === username && user.password === password) {
            return { check: true, username: user.username};
        }
        else {
            return { check: false, username: username , message: "Incorrect password"};
        }
    } catch(e) {console.log(e);}
}

/* export async function findOrCreate(profile) {
    const user = await find(profile.id);
    if (user) return user;
    return await create(profie.id, profile.password, 
                        profile.provider, profile.familtyName, 
                        profile.givenName, profile.middleName,
                        profile.emails, profile.photos);
}  */

export async function listUsers() {
    const SQUser = await connectDB();
    const userList = await SQUser.findAll({});
    return userList.map( user => sanitizedUser(user));
}

export function sanitizedUser(user) {
    var ret = {
        id: user.id, name: user.name, lastName: user.lastName, cid: user.cid, email: user.email, telf: user.telf
    };

    return ret;
}

export async function deleteUser(id) {
    const SQUser = await connectDB();
    const user = await SQUser.findOne({where: {id}});
    if (user) {
        user.destroy();
        return { deleted: true, message: "Usuario eliminado con éxito" };
    }
    return { deleted: false, message: "Eliminación fallida, el usuario no existe"}
    
}