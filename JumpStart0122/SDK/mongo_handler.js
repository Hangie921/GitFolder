var instance = require('../SDK/instance'),
	//modify by Randy 19.02.2016
	// mongo = instance.startMongo(),
	bodyParser = require('../FrontEnd/node_modules/body-parser'),
	config = require('../FrontEnd/config/server_init'),
	log = require("../SDK/log_handler");


function handle(mongoClient,crud,doc,collection,query,condition,callback){
	var result = null;
	var status = null;

	if(crud === "find"){
		findDetail(mongoClient,collection,query,condition,function(err,doc){
			if(err){
				console.log('error while finding the details');
				console.log(err);
				staus = false
				throw err;
			}else{
				console.log('found the detail cursor '+ doc);
				status = true;	
				result = doc;
				callback(null,status,result);
			}	
		});

	}else if(crud === "insert"){
		status = insertToCollection(mongoClient,doc,collection);
		callback(null,status,result);
		
	}else if(crud === "update"){
		update(req,res);
		// console.log("update success");
		//change the rusult
	}else if(crud === "deleteInfo"){
		deleteInfo();
		// console.log("delete success");
		//change the rusult
	}
	
}



function findDetail(mongoClient,collection,query,condition,callback){ //undone
	if(typeof condition !== Object){ //if there is no condition,give it a default
		condition = {
			projection: {"_id":0},
			sort: {},
			skip: 0,
			limit: 0
		};
	}else{
		
	}
	//start to query the data and return the doc to callback()
	console.log("start to find docs in collection '" + collection + "'.");
	mongoClient.connect(mongoClient.url,function(err,db){
		if(!err){
			console.log("connect mongo successfully");
			var cursor = db.collection(collection).find(query,condition.projection);
			console.log("findDetail() return cursor");
			callback(null,cursor);
				// cursor.forEach(function(doc){
				// 	if(doc){
				// 		console.log("findDetail() return doc");
				// 		callback(null,doc);
				// 	}else{
				// 		console.log('find nothing');
				// 		console.log('db closed');
				// 		db.close();
				// 		return false;
				// 	}
					
				// });
		}else{
			console.log('error while connecting to the mongo client');
			console.log(err);
			return;
		}
	});
}

function insertToCollection(mongoClient,doc,collection){
	//Assign a collection to insert docs
	var status = false;
	log.info('Start to insert to '+ collection);
	mongoClient.connect(mongoClient.url,function(err,db){
		if(err){
			//modify by Randy 19.02.2016
			console.log('Unexpected error happened,please retry it later.');
			log.error("Unexpected error below while connecting to DB");
			log.error(err);
			return;
		}else{
			log.info("Connet to mongo successfully");
			db.collection(collection).insertOne(doc,function(err){
				if(err){
					//modify by Randy 19.02.2016
					console.log(collection);
					console.log(err);
					console.log('Unexpected error happend, please retry it later');
					log.error('error while inserting the info to '+collection);
					log.error(err);
					status = false;
					// res.end('error');
				}else{
					log.info("Insert doc into '" + collection + "' collection!");
					// res.end('success');
					status = true;
					log.info("Insert doc successfully");
				}
				db.close();
				log.info("mongo connections closed");
			});
		}
	});
	return status;
}

exports.handle = handle;