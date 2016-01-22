//start combine of the server and mongo , return the port
var instance = require("../SDK/instance"),
	index_page = require("./controller/index"),
	submit_page = require("./controller/submit"),
	coming_page = require("./controller/coming_soon");

var app = instance.startApp(),
	mongo = instance.startMongo();


//route the different page



index_page.index_route(app,mongo);
submit_page.submit_route(app,mongo);
coming_page.coming_route(app,mongo);







