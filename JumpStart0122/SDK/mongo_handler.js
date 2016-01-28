var instance = require('../SDK/instance'),
	mongo = instance.startMongo(),
	bodyParser = require('../FrontEnd/node_modules/body-parser'),
	config = require('../FrontEnd/config/server_init');


function handle(app,mongoClient,crud,req,res,doc,collection,callback){
	var status = false;
	if(crud === "find"){
		findDetail(app,mongoClient,req,res,collection);
	}else if(crud === "insert"){
		insertToCollection(app,mongoClient,req,res,doc,collection,callback);
		// console.log("Insert success");
	}else if(crud === "update"){
		update(req,res);
		// console.log("update success");
	}else if(crud === "deleteInfo"){
		deleteInfo();
		// console.log("delete success");
	}else if(crud === "insert_contact"){

	}
	
}

function findDetail(app,mongoClient,req,res,collection){
	console.log("start to find");

}

function insertToCollection(app,mongoClient,req,res,doc,collection,callback){
	console.log('Start to insert to '+ collection);
	mongoClient.connect(mongoClient.url,function(err,db){
		db.collection(collection).insertOne(doc,function(err,result){
			if(!err){
				console.log("Insert doc into '"+collection+"' collection!");
			}else{
				console.log(err);
			}
		db.close();
		});
	});
	callback(req,res);
}

function insertToDetail(app,mongoClient,req,res,doc,callback){
	console.log('start to insert');
	mongoClient.connect(mongoClient.url,function(err,db){
		db.collection('detail').insertOne(doc,function(err,result){
			if(err){
				console.log(err);
			}else{
				console.log("Inserted docs into 'detail' collection");
			}
		db.close();
		});	
	});
	callback(req,res);
}

exports.handle = handle;