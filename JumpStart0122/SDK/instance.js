//start the server and the mongo , return a combination object of the both

var express = require("express"),
	// jade = require("jade"),
	app = express(),
	mongo = require("mongodb"),
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

function initMongo(){
	var MongoClient = mongo.connect("mongodb://localhost:27017/test1",function(err,db){
	assert.equal(err,null);
	console.log("Successfully connect Mongo");
});
	return mongo;
}

exports.startApp = initApp;
exports.startMongo = initMongo;
