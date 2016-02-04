//upload the file , call the submit module , send the status to user
var multer= require('multer'),
	assert = require('assert'),
	mongo_handler = require('../../SDK/mongo_handler'),
	contact = require("../module/contact");


function route(app, mongoClient){	
	app.post('/contact',function(req,res){ //upload the file and submit the info
		contact.form_handle(req,res,function(err,req,res){
			if(!err){
				var doc = contact.to_object(req,res);
				mongo_handler.handle(app,mongoClient,'insert',req,res,doc,'contact',function(req,res){
					// res.render('show');
					res.end('success');
				});
			}else{
				console.log(err);
				res.end('error');
			}	

		});//end of the the file_handler callback

	});
}

exports.route = route;