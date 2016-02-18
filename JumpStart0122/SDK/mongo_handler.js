var instance = require('../SDK/instance'),
	mongo = instance.startMongo(),
	bodyParser = require('../FrontEnd/node_modules/body-parser'),
	config = require('../FrontEnd/config/server_init'),
	log = require("../SDK/log_handler");


function handle(mongoClient,crud,doc,collection,condition,callback){
	var result = null;
	var status = null;

	if(crud === "find"){
		findDetail(mongoClient,collection,query,condition,function(err,docArray){
			result = docArray;
		});

	}else if(crud === "insert"){
		status = insertToCollection(mongoClient,doc,collection);
		callback(null,status,null);
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

function findDetail(mongoClient,collection,query,condition,callback){ //undone
	if(typeof condition !== Object){ //if there is no condition,give it a default
		condition = {
			projcetion: {"_id":0},
			sort: {},
			skip: 0,
			limit: 0
		};
	}else{
		for(var x in condition){ 
			//undone
		}
	}
	//start to query the data and return the docArray to callback()
	console.log("start to find in collection '" + collection + "'.");
	var docArray = null;
	mongoClient.connect(mongoClient,function(err,db){
		if(!err){
			var cursor = db.collection(collection).find(query,projection);
			if(cursor.toArray().length > 0){
				docArray = cursor.toArray();
			}else{
				console.log('There is no result in DB');
			}
		}else{
			console.log(err);
		}
		db.close();
	});

	callback(null,docArray);
}

exports.handle = handle;