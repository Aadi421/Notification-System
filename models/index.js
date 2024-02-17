const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const Schemas = {};
const mongoose = require('mongoose');
const CONFIG = require('../config/index');
const color = require('colors');


if (CONFIG.DB_HOST != '') {
    // Reads all models
    fs.readdirSync(__dirname).filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    }).forEach((file) => {
        var filename = file.split('.')[0];
        var model_name = filename.charAt(0).toUpperCase() + filename.slice(1);
        Schemas[model_name] = require('./' + file);
    });


    mongoose.Promise = global.Promise; // set mongo up to use promises
    const mongo_location  = 'mongodb://' + CONFIG.DB_HOST + ':' + CONFIG.DB_PORT + '/' + CONFIG.DB_NAME + '?authSource=admin';
    
    // mongoose.set("debug","true")

    mongoose.connect(mongo_location, {
        user: CONFIG.DB_USER, pass: CONFIG.DB_PASSWORD,
        useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
    }).catch((err) => {
        console.log(color.red('Can Not Connect to Mongo Server:', mongo_location));
    })
    let db = mongoose.connection;
    module.exports = db;

    db.once('open', () => {
        console.log(color.blue('Connected to mongo at ' + mongo_location));
    })

    db.on('error', (error) => {
        console.log(color.red("error", error));
    })
    // End of Mongoose Setup
}
else {
    console.log(color.cyan("No Mongo Credentials Given"));
}


module.exports = { Schemas};

