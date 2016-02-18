var instance = require('../SDK/instance'),
	mongo = instance.startMongo(),
	bodyParser = require('../FrontEnd/node_modules/body-parser'),
	config = require('../FrontEnd/config/server_init'),
	log = require("../SDK/log_handler");


function handle(mongoClient,crud,doc,collection,query,condition,callback){
	var result = null;
	var status = null;

	if(crud === "find"){
		result = findDetail(mongoClient,collection,query,condition,function(err,docArray){
			if(err){
				log.error('erroe while finding the details');
				log.error(err);
			}else{
				log.info('found the detail');
				status = true;	
				return docArray;
			}	
		});

	}else if(crud === "insert"){
		status = insertToCollection(mongoClient,doc,collection);
		
	}else if(crud === "update"){
		update(req,res);
		// console.log("update success");
		//change the rusult
	}else if(crud === "deleteInfo"){
		deleteInfo();
		// console.log("delete success");
		//change the rusult
	}
	callback(null,status,result);
	// return docArray;
}



function findDetail(mongoClient,collection,query,condition,callback){ //undone
	if(typeof condition !== Object){ //if there is no condition,give it a default
		condition = {
			projcetion: {"_id":0},
			sort: {},
			skip: 0,
			limit: 0
		};
	}else{
		
	}
	//start to query the data and return the docArray to callback()
	log.info("start to find in collection '" + collection + "'.");
	var docArray = null;
	mongoClient.connect(mongoClient.url,function(err,db){
		if(!err){
			log.info("connect mongo successfully");
			var cursor = db.collection(collection).find(query,condition.projection);
			if(cursor.toArray().length > 0){
				docArray = cursor.toArray();
			}else{
				return;
			}
		}else{
			log.error('error while connecting to the mongo client');
			log.error(err);
			return;
		}
		db.close();
	});

	callback(null,docArray);
}

function insertToCollection(mongoClient,doc,collection){
	//Assign a collection to insert docs
	var status = false;
	log.info('Start to insert to '+ collection);
	mongoClient.connect(mongoClient.url,function(err,db){
		if(err){
			alert('Unexpected error happened,please retry it later.');
			log.error("Unexpected error below while connecting to DB");
			log.error(err);
			return;
		}else{
			log.info("Connet to mongo successfully");
			db.collection(collection).insertOne(doc,function(err){
				if(err){
					alert('Unexpected error happend, please retry it later');
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