//init the server and the mongo , return a combination of the both

var express = require("express"),
    app = express(),
    methodOverride = require('method-override'),
    MongoClient = require('mongodb').MongoClient,
    Server = require("mongodb").Server,
    assert = require('assert'),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
    log = require('../SDK/log_handler'),
    session = require('express-session'),
    bodyParser = require('body-parser');


function initApp(config, dir_path) {
    var port = config.server.port

    app.set("views", path.join(dir_path, "view"));
    app.set('view engine', config.server.view_engine);
    // app.use(express.static(__dirname + '/upload'));
    app.use(express.static(path.join(dir_path, "static")));
    app.use("/upload",express.static(path.join(dir_path, "upload")));
    app.use(session({
        secret: 'keyboard cat',
        cookie: { maxAge: config.session.expires },
        resave: true,
        saveUninitialized: true
    }));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(methodOverride(function(req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method
            delete req.body._method
            return method
        }
    }));

    var server = app.listen(port, function(err) { //initial the server 
        if (err) {
            // console.log(err);
            log.error(err);
            return;
        }
        server.address().port = port;
        log.info("Express server listening on port " + port);
        console.log("Express server listening on port " + port);
    });
    return app;
}

function initMongo(config) { //return the mongoClient object when call the initial function 

    //set up the connection to the server
    var url = config.mongo.url;
    var port = config.mongo.port;
    var mongoClient = new MongoClient();

    mongoClient.url = "mongodb://" + url + ":" + port + "/" + config.mongo.db;
    log.info("Mongo server listening on port " + port);
    console.log("Mongo server listening on port " + port);

    return mongoClient;
}

exports.startApp = initApp;
exports.startMongo = initMongo;
