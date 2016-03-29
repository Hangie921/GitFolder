//start a backend server and mongoclient connection

var instance = require('../SDK/instance'),
    path = require('path'),
    index = require('./controller/index'),
    reg_info = require('./controller/reg_info'),
    contact_info = require('./controller/contact_info'),
    login = require('./controller/login'),
    logout = require('./controller/logout'),
    config = require('./config/back_server_init.json'),
    mongo_handler = require('../SDK/mongo_handler'),
    encrypt = require('./module/encrypt')



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
        console.log(status);
        console.log("U have the default account 'admin' in your 'member' collection");
    }
});


index.route(app, mongoClient);
login.route(app, mongoClient);
logout.route(app, mongoClient);
reg_info.route(app, mongoClient);
contact_info.route(app, mongoClient);
