//start combine of the server and mongo , return the port
var instance = require("../SDK/instance"),
	// index_page = require("./controller/index"),  
	//For Pepper temporary
	index_page = require("./controller/index_pepper"),
	submit_page = require("./controller/submit"),
	coming_page = require("./controller/coming_soon"),
	upload = require("./controller/upload"),
	show = require("./controller/show"),
	contact_us = require("./controller/contact_us");
	index_page_sg = require("./controller/index_page_sg");
var path = require('path');
var config = require ("../FrontEnd/config/server_init.json");


var app = instance.startApp(
								config,
								path.dirname(process.argv[1])
							),
	//the app has been set the port, the view engine and the dir.path
	mongoClient = instance.startMongo(
								config
							);


//route the different page
index_page.index_route(app,mongoClient);
submit_page.submit_route(app,mongoClient);
coming_page.coming_route(app,mongoClient);
upload.route(app,mongoClient);
show.show_route(app,mongoClient);
contact_us.route(app,mongoClient);
index_page_sg.route(app,mongoClient);








