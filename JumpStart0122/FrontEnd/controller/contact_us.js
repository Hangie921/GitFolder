//upload the file , call the submit module , send the status to user
var multer= require('multer'),
	assert = require('assert'),
	mongo_handler = require('../../SDK/mongo_handler'),
	contact = require("../module/contact"),
	log = require("../../SDK/error_handler");


function route(app, mongoClient){	
	app.post('/contact',function(req,res){ //upload the file and submit the info
		log.info("/contact route accepted");
		contact.form_handle(req,res,function(err,req,res){
			if(err){
				log.error("Unexpected error while handling the contact form");
				log.error(err.stack);
				res.end('error');
			}else{
				var doc = contact.to_object(req,res);
				mongo_handler.handle(app,mongoClient,'insert',req,res,doc,'contact',function(err,req,res){
					if(err){
						log.error("Unexpect error below while inserting the contact info");
						log.error(err);
					}else{
						res.end('success');
					}
					
				});
			}	

		});//end of the the file_handler callback

	});
}

exports.route = route;