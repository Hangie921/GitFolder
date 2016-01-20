var express = require('express'),
	app = express(),
	engines = require('consolidate');
	MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

app.engine('html', engines.nunjucks );
app.set('view engine','html');
app.set('views', __dirname + '/views');

MongoClient.connect("mongodb://localhost:27017/mydb",function(err,db){
	assert.equal(null, err);
	console.log("Connection success");

	app.get('/',function(req,res){
		db.collection('movie').find({}).toArray(function(err,docs){
			res.render('movie',{'movies': docs });

		});
		// db.collection('movie',function(err,collection){
		// 	collection.findOne({movie:'Transformer2'},function(err,data){
		// 		if(data){
		// 			console.log(data.movies);
		// 		}else{
		// 			console.log('Cannot Found');
		// 		}
		// 	});

		// });
	});

	app.use(function(req,res){
		res.sendStatus(404);
	});

	var server = app.listen(3000,function(){
	var port = server.address().port;
	console.log("Express server listening on port %s ",port);
});

});
