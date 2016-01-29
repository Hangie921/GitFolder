//start a backend server and mongoclient connection

var instance = require('../SDK/instance'),
	path = require('path'),
	index = require('../BackEnd/controller/index'),
	login = require('../BackEnd/controller/login'),
	logout = require('../BackEnd/controller/logout'),
	config = require('../BackEnd/config/back_server_init.json');



var app = instance.startApp(config.server.port,config.server.view_engine,path.dirname(process.argv[1])),
	mongoClient = instance.startMongo(config.mongo.url,config.mongo.port,config.mongo.db);

index.route(app,mongoClient);
login.route(app,mongoClient);
logout.route(app,mongoClient);