var multer= require('multer'),
	assert = require('assert'),
	mongo_handler = require('../../SDK/mongo_handler'),
	submit = require("../module/submit"),
	log = require("../../SDK/error_handler");

function route(app,mongoClient){
	// var cpFile = upload.single('BP_file');
	app.post('/upload',function(err,req,res){ //upload the file and submit the info
		log.info("/upload route accepted");
		if(err){
			// console.log("Unexpected error below while handling the '/upload' route");
			log.error("Unexpected error below while handling the '/upload' route");
			log.error(err);
		}else{
			// console.log('Start uploading the file to server.');
			log.debug("Start uploading the file to server.");
			submit.file_handler(req,res,'BP_file',function(err,req,res){
				if(err){
					// console.log('Unexpected error below while handling the file!');
					log.error("Unexpected error below while handling the file!");
					// console.log(err.stack);
					log.error(err.stack);
					res.end();
				}else{
					// console.log("file uploaded");
					log.debug("file uploaded");
					// console.log('Start uploading the user info.');
					log.debug('Start uploading the user info.');
					var doc = submit.to_object(req,res);
					mongo_handler.handle(app,mongoClient,'insert',req,res,doc,'detail',function(err,req,res){
						if(err){// res.render('show');
							// console.log('Unexpected error below while inserting info to DB');
							log.error('Unexpected error below while inserting info to DB');
							// console.log(err.stack);
							log.error(err.stack);
						}else{
							res.end();
							log.info("response ended.");
						}
					});
				}	
			});//end of the the file_handler callback
		}
		

	});
}//end of the route

exports.route = route;