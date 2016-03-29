//upload the file , call the submit module , send the status to user
var multer= require('multer'),
	assert = require('assert'),
	mongo_handler = require('../../SDK/mongo_handler'),
	contact = require("../module/contact"),
	log = require("../../SDK/log_handler");


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
				console.log(doc);
				mongo_handler.handle(mongoClient,'insert',doc,'contact',null,null,function(err,status,result){
					//the null is the condition varible
					if(err){
						log.error("Unexpect error below while inserting the contact info");
						log.error(err);
						return;
					}else if(status === true){
						log.info("insert the contact info successfully");
						return;
					}
				});
				res.send(true);
			}	
		});//end of the the file_handler callback

	});
}

exports.route = route;