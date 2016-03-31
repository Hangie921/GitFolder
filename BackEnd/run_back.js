//start a backend server and mongoclient connection

var instance = require('../SDK/instance'),
    mongo_handler = require('../SDK/mongo_handler'),
    path = require('path'),
    index = require('./controller/index'),
    reg_info = require('./controller/reg_info'),
    download = require('./controller/download'),
    contact_info = require('./controller/contact_info'),
    login = require('./controller/login'),
    logout = require('./controller/logout'),
    config = require('./config/back_server_init.json'),
    encrypt = require('./module/encrypt'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jumpstart');

var app = instance.startApp(
        config,
        path.dirname(process.argv[1])
    ),
    //the app has been set the port, the view engine and the dir.path
    mongoClient = instance.startMongo(
        config
    );



//start to insert the default account in mongo
var query = {
    "acc": config.backend_default_account.acc,
    "psw": encrypt.md5(config.backend_default_account.psw)
};

mongo_handler.handle(mongoClient, 'upsert', null, 'member', query, null, function(err, status) {
    if (err) {
        console.log('err while upserting the default account to db');
        console.log(err);
    } else {
        console.log("U have the default account 'admin' in your 'member' collection");
    }
});


index.route(app, mongoClient);
download.route(app, mongoClient);
login.route(app, mongoClient);
logout.route(app, mongoClient);
reg_info.route(app, mongoClient);
contact_info.route(app, mongoClient);
