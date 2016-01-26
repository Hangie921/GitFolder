//start combine of the server and mongo , return the port
var instance = require("../SDK/instance"),
	index_page = require("./controller/index"),
	submit_page = require("./controller/submit"),
	coming_page = require("./controller/coming_soon"),
	upload = require("./controller/upload"),
	show = require("./controller/show");

var app = instance.startApp(),
	mongoClient = instance.startMongo();


//route the different page
index_page.index_route(app,mongoClient);
submit_page.submit_route(app,mongoClient);
coming_page.coming_route(app,mongoClient);
upload.route(app,mongoClient);
show.show_route(app,mongoClient);








