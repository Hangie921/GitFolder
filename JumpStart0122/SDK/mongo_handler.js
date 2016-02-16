var instance = require('../SDK/instance'),
	mongo = instance.startMongo(),
	bodyParser = require('../FrontEnd/node_modules/body-parser'),
	config = require('../FrontEnd/config/server_init'),
	log = require("../SDK/error_handler");


function handle(app,mongoClient,crud,req,res,doc,collection,callback){
	var result = null;
	if(crud === "find"){
		var query;
		var projection;
		findDetail(app,mongoClient,query,projection,collection,function(docArray){
			result = docArray;
		});

	}else if(crud === "insert"){
		insertToCollection(app,mongoClient,req,res,doc,collection,callback);
		// console.log("Insert success");
		//change the rusult
	}else if(crud === "update"){
		update(req,res);
		// console.log("update success");
		//change the rusult
	}else if(crud === "deleteInfo"){
		deleteInfo();
		// console.log("delete success");
		//change the rusult
	}
	
	// return docArray;
}

function findDetail(app,mongoClient,collection,query,condition,callback){ //undone
	//pack all the conditions in to a condition object
	if(typeof condition !== Object){
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

	callback(docArray);
}

function insertToCollection(app,mongoClient,req,res,doc,collection,callback){
	//Assign a collection to insert docs

	log.debug('Start to insert to '+ collection);
	mongoClient.connect(mongoClient.url,function(err,db){
		if(err){
			alert('Unexpected error happened,please retry it later.');
			log.error("Unexpected error below while connecting to DB");
			log.error(err);
			return;
		}else{
			db.collection(collection).insertOne(doc,function(err,result){
				if(err){
					alert('Unexpected error happend, please retry it later');
					log.error('error while inserting the info to '+collection);
					log.error(err);
					res.end('error');
				}else{
					log.debug("Insert doc into '" + collection + "' collection!");
					res.end('success');
					
				}
				db.close();
			});
		}
	});
	// callback(req,res);
}

exports.handle = handle;