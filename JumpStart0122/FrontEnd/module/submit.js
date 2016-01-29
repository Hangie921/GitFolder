//This is the module that handles all the function about submit the context
//
var config = require("../config/server_init.json");
var multer = require('multer'),
    storage1 = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, config.server.upload_path)
	  },
	  filename: function (req, file, cb) {
	    cb(null, Date.now()+config.server.upload_file_format)
	  }
	});
//setting above

var timestamp = null;
var schema = {
	"team_info" : {
		"team_name" : "",  
		"product_brief" : "",
		"member_brief" : {  // add the member dynamically

		},

		"bp_file" : {
			"file_name" : "",
			"file_path" : ""
		},

		"contact" : {
			"name" : "",
			"email" : "",
			"address" : "",
			"phone" : ""
		}
	},
	
	"reg_time" : timestamp,
	"readed" : {
		"Randy" : {
			"readed_time" : timestamp,
			"readed_flag" : true
		},
		"Walter" : {
			"readed_time" : timestamp,
			"readed_flag" : false
		}
	},
	"_id": null,

};
var team_info = schema.team_info;

function to_object(req,res){   //pack all the info of the form into a object
	team_info.team_name = req.body.team_name;
	team_info.product_brief = req.body.product_brief;
	
	console.log(team_info.member_brief);
	console.log("Start to input members to the member_brief field");

	for(var i =0; i<req.body.member_brief_name.length;i++){
		var name = "member_"+i;
		team_info.member_brief[name]= {"name":req.body.member_brief_name[i],"info":req.body.member_brief_info[i]};
		//add the member of the team according to how many 'member_brief_name' field are there in the form
	}

	console.log("Start to log the member_brief object");
	console.log(team_info.member_brief);

	team_info.contact.name = req.body.contact;
	team_info.contact.email = req.body.email;
	team_info.contact.address = req.body.address;
	team_info.contact.phone = req.body.phone;
	team_info.bp_file.file_name = req.file == true ? req.file.filename:null;
	team_info.bp_file.file_path = req.file == true ? req.file.path:null;
	return team_info;//team_info is already an object
}

function file_handler(req,res,field_name,callback){ // upload the bp file if there is any
	
	var upload = multer({ storage: storage1 }).single(field_name); // declare a multer object
	upload(req,res,function(err){
		if(!err){
			console.log(req.file);
			callback(err,req,res);
		}else{
			console.log(err);
		}
	});

}

exports.to_object = to_object;  //enter a json varible when call the function  
exports.file_handler = file_handler;
