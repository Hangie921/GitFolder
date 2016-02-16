//start combine of the server and mongo , return the port
var instance = require("../SDK/instance"),
	index_page = require("./controller/index"),
	submit_page = require("./controller/submit"),
	coming_page = require("./controller/coming_soon"),
	upload = require("./controller/upload"),
	show = require("./controller/show"),
	contact_us = require("./controller/contact_us");
var path = require('path');


var config = require ("../FrontEnd/config/server_init.json");


var app = instance.startApp(config.server.port,config.server.view_engine,path.dirname(process.argv[1])),
	mongoClient = instance.startMongo(config.mongo.url,config.mongo.port,config.mongo.db);


//route the different page
index_page.index_route(app,mongoClient);
submit_page.submit_route(app,mongoClient);
coming_page.coming_route(app,mongoClient);
upload.route(app,mongoClient);
show.show_route(app,mongoClient);
contact_us.route(app,mongoClient);








