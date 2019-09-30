import Sequelize from "sequelize";
import jsyaml from "js-yaml";
import fs from "fs-extra";
import util from "util";
import DBG from "debug";
import * as usersModel from './users-sequelize';
import { finished } from "stream";


var SQEntrances;
var squelz;

async function connectDB(){
    
    if (SQEntrances) { return SQEntrances.sync();}
    
    
    const yamltext = await fs.readFile(process.env.SEQUELIZE_CONNECT, 'utf8');

    const params = await jsyaml.safeLoad(yamltext, 'utf8');
    
    if (!squelz) squelz = new Sequelize(
        params.dbname, 
        params.username,
        params.password, 
        params.params
    );

    if (!SQEntrances) SQEntrances = squelz.define( 'Entrances' , {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        userId: { 
            type: Sequelize.INTEGER/* , 
            references: {
                model: usersModel, 
                key: 'id'
            } */
        }
    });
    return SQEntrances.sync();
}

 export async function create(userId) {
     try {
         const SQEntrances = await connectDB();
         return SQEntrances.create({
             userId: userId
         });

     } catch(e){
         console.log(e);
     }
}


export async function listEntrances() {
    const SQEntrances = await connectDB();
    const SQUser = await usersModel.connectDB();
    const entrancesList = await SQEntrances.findAll({limit:6 , order: [['createdAt', "DESC"]]});
    return await Promise.all(entrancesList.map( async(entrance) => {
        let userData = await SQUser.findOne({ where: {id: entrance.userId}});
        return sanitizedEntrances(entrance, userData);
    }));
}

export function sanitizedEntrances(entrance, userData) {
    var ret = {
        name: userData.name, lastName: userData.lastName, cid: userData.cid, createdAt: entrance.createdAt
    };
    return ret;
}
