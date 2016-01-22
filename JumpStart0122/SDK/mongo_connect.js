// load the config and return mongo object

var mongo= require('mongodb'),
	assert = require('assert');

function start(){
	return mongo;
}

exports.start = start;

