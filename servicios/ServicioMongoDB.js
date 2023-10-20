const { MongoClient } = require('mongodb');
const e = require("express");
const ClienteMongo= require("mongodb").MongoClient;


const url = 'mongodb://localhost:27017/';

let database = null;


async function connectToDatabase(dbname) {
    if (database) return database;

    try {
        const client = new MongoClient(url+dbname,
            { useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        await client.connect();
        database = client.db();
        return database;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

async  function crearDatabase(databaseName){
    try {

        await ClienteMongo.connect(url+databaseName, function(err, db) {
            if (err) throw err;
            console.log("Base de Datos Creada");
            db.close();
        });

    }catch (error){
        console.log(error);
    }
}
async function crearCollection(dbname, colectionName){

    try {
        await ClienteMongo.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db(dbname);
            dbo.createCollection(colectionName, function (err, res) {
                if (err) throw err;
                console.log("Coleccion creada");
                db.close();
            });
        });
    }catch (error){
        console.log("Error en creacion de base de datos. Detalles: ",error);
    }
}

async function insertarEnColeccion(dbName, colectionName, objectToInsert){
     await  ClienteMongo.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db(dbName);
        dbo.collection(colectionName).insertOne(objectToInsert, function(err, res) {
            if (err) throw err;
            console.log("1 elemento insertado");
            db.close();
        });
    });
}
/*
*   dbName => string
*   collectionName => string
*   query => { prop: value}
* Busca en el JSON Collection pasandole una query.
*
* PorEjemplo =>
   query = { address: "Park Lane 38" };
});
* */
async  function buscarPorQuery(dbName, collectionName, query){
    try {
        await ClienteMongo.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db(dbName);
            dbo.collection(colectionName).find(query).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
                return result;
            });

        });

    }catch (error){
        console.log("Error en la busqueda. Detalles: ",error);
        return null;
    }
}


async function deleteByQuery(dbName, collectionName, query){
    try {
        await ClienteMongo.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db(dbName);
            dbo.collection(collectionName).deleteOne(query, function(err, obj) {
                if (err) throw err;
                console.log("1 elemento borrado");
                db.close();
            });
        });

    }catch (error){
        console.log(error);
    }
}
async function deleteMultipleByQuery(dbName, collectionName, query){
    try {
        await ClienteMongo.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db(dbName);
            dbo.collection(collectionName).delete(query, function(err, obj) {
                if (err) throw err;
                console.log("1 elemento borrado");
                db.close();
            });
        });

    }catch (error){
        console.log(error);
    }
}
module.exports = { connectToDatabase };
