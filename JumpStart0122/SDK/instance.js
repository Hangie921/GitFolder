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


function initApp(){
	app.set("views",config.server.view_path);
	app.set('view engine',config.server.view_engine);
	app.use( express.static( "../FrontEnd/static" ) );
	var server = app.listen(3000,function(){  //initial the server 
			server.address().port = config.server.port;
			console.log("Express server listening on port %s ",config.server.port);
	});
	return app;
}

function initMongo(){  //return the mongoClient object when call the initial function (undone)
	
	//set up the connection to the server
	var mongoClient = new MongoClient();
	mongoClient.url = "mongodb://"+config.mongo.url+":"+config.mongo.port+"/jumpstart";
	return mongoClient;
}

exports.startApp = initApp;
exports.startMongo = initMongo;