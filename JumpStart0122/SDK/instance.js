//init the server and the mongo , return a combination of the both

var express = require("express"),
	// jade = require("jade"),
	app = express(),
	MongoClient = require('mongodb').MongoClient,
	Server = require("mongodb").Server,
	assert = require('assert'),
	fs = require('fs'),
	http = require('http');

var config = require ("../FrontEnd/config/server_init.json");

function initApp(dir_path){
	app.set("views",path.join(dir_path, "view"));
	app.set('view engine',config.server.view_engine);
	app.use( express.static( path.join(dir_path, "static") ) );
	var server = app.listen(config.server.port ,function(){  //initial the server 
			server.address().port = config.server.port;
			console.log("Express server listening on port %s ",config.server.port);
	});
	return app;
}

function initMongo(){  //return the mongoClient object when call the initial function (undone)
	
	//set up the connection to the server
	var mongoClient = new MongoClient();
	mongoClient.url = "mongodb://"+config.mongo.url+":"+config.mongo.port+"/"+config.mongo.db;
	return mongoClient;
}

exports.startApp = initApp;
exports.startMongo = initMongo;