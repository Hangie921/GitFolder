// load the config and return the express.app object
var express = require('express'),
	app = express();


function start(){  
	return app;
}

exports.start = start;
