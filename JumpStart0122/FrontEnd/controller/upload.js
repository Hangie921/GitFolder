var multer= require('multer'),
	assert = require('assert'),
	mongo_handler = require('../../SDK/mongo_handler'),
	submit = require("../module/submit");

function route(app,mongoClient){
	// var cpFile = upload.single('BP_file');
	app.post('/upload',function(req,res){ //upload the file and submit the info
		console.log('Uploading the file');
		submit.file_handler(req,res,'BP_file',function(err,req,res){
			if(!err){
				console.log("file uploaded");
				console.log('Uploading the info');
				var doc = submit.to_object(req,res);
				mongo_handler.handle(app,mongoClient,'insert',req,res,doc);
			}else{
				console.log(err);
			}	
		// req.file is the `upload` file
		// req.body will hold the text fields, if there were any
		// res.redirect('show');
		});//end of the the file_handler callback

	});
}//end of the route

exports.route = route;