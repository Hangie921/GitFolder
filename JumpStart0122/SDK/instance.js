//init the server and the mongo , return a combination of the both

var express = require("express"),
	app = express(),
	MongoClient = require('mongodb').MongoClient,
	Server = require("mongodb").Server,
	assert = require('assert'),
	fs = require('fs'),
	http = require('http'),
	path = require('path');
	log = require('../SDK/log_handler');



function initApp(port,view_engine,dir_path){
	app.set("views",path.join(dir_path, "view"));
	app.set('view engine',view_engine);
	app.use( express.static( path.join(dir_path, "static") ) );
	var server = app.listen(port ,function(err){  //initial the server 
			if(err){
				// console.log(err);
				log.error(err);
				return;
			}
			server.address().port = port;
			log.info("Express server listening on port " +port);
			// console.log("Express server listening on port %s ", port);
	});
	return app;
}

function initMongo(url,port,db){  //return the mongoClient object when call the initial function 
	
	//set up the connection to the server
	var mongoClient = new MongoClient();
	mongoClient.url = "mongodb://"+url+":"+port+"/"+db;
	return mongoClient;
}

exports.startApp = initApp;
exports.startMongo = initMongo;