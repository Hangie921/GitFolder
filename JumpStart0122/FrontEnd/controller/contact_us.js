//upload the file , call the submit module , send the status to user
var multer= require('multer'),
	assert = require('assert'),
	mongo_handler = require('../../SDK/mongo_handler'),
	contact = require("../module/contact");


function route(app, mongoClient){	
	app.get('/contact_us',function(req,res){
		res.render('contact_us');
	});
	app.post('/contact',function(req,res){ //upload the file and submit the info
		console.log('Uploading the detail');
		contact.form_handle(req,res,function(err,req,res){
			if(!err){
				console.log("detail uploaded");
				var doc = contact.to_object(req,res);
				mongo_handler.handle(app,mongoClient,'insert',req,res,doc,'contact',function(req,res){
					res.render('show');
				});
			}else{
				console.log(err);
			}	
		// req.file is the `upload` file
		// req.body will hold the text fields, if there were any
		// res.redirect('show');
		});//end of the the file_handler callback

	});
}

exports.route = route;