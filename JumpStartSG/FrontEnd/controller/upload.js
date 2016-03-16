var multer= require('multer'),
	assert = require('assert'),
	mongo_handler = require('../../SDK/mongo_handler'),
	submit = require("../module/submit"),
	log = require("../../SDK/log_handler");

function route(app,mongoClient){
	app.post('/upload',function(req,res){ //upload the file and submit the info
		log.info("/upload route accepted");
		log.info("Start uploading the file to server.");
		submit.file_handler(req,res,'BP_file',function(err,req,res){
			if(err){
				log.error("Unexpected error below while handling the file!");
				log.error(err.stack);
				res.end();
			}else{
				log.info("file uploaded");
				log.info('Start uploading the user info.');
				
				var doc = submit.to_object(req,res);
				
				mongo_handler.handle(mongoClient,'insert',doc,'detail',null,null,function(err,status,result){
					if(err!==null){// res.render('show');
						log.error('Unexpected error below while inserting info to DB');
						log.error(err.stack);
						return;
					}else if(status === true){
						log.info('uploading the user info successfully.');
						return;	
					}
				});
				res.send(true);
			}	
		});//end of the the file_handler callback
		
		

	});
}//end of the route

exports.route = route;