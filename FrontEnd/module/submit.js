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
var log = require('../../SDK/log_handler');
//setting above


var schema = function(){
	var d = new Date();
	var sec = d.getSeconds().toString().length == 1?('0'+d.getSeconds()):d.getSeconds();
	var min = d.getMinutes().toString().length == 1?('0'+d.getMinutes()):d.getMinutes();
	var hour = d.getHours().toString().length == 1 ?('0'+d.getHours()):d.getHours();
	var timestamp = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate()+" "+hour+":"+min+":"+ sec;
	
	return {
		"team_details":{
			"team_name":"",
			"team_category":"",
			"team_leader_name":"",
			"leader_email":"",
			"mobile":"",
			"agree_subscribe":false,
			"agree_terms":false,
			
			"PDF_path":"",
			"PDF_name":"",

			"team_member":{

				},
			"reg_time":"",
			"paid":false,
		},
		"admin_detail":{
			"last_editor_id":null,
			"last_edit_time":null
			}
	};
}//end of the schema function


function to_object(req,res,callback){   //pack all the info of the form into a object
	var doc = schema();
	team_details = doc.team_details;

	//enter the team_details into doc object
	team_details.team_name = req.body.team_name;
	team_details.team_category = req.body.team_category;
	team_details.team_leader_name = req.body.team_leader_name;
	team_details.leader_email = req.body.leader_email;
	team_details.mobile = req.body.mobile;
	team_details.agree_subscribe = req.body.agree_subscribe;
	team_details.agree_terms = req.body.agree_terms;

	
	log.info("Start to input members to the member_brief field");
	console.log("Start to input members to the member_brief field");

	if(typeof req.body.member_name === 'string'){
		team_details.team_member["member_0"] = {"name":req.body.member_name,"email":req.body.member_email };
	}else{
		for(var i =0; i<req.body.member_name.length;i++){
			var name = "member_" + i;
			team_details.team_member[name] = { "name":req.body.member_name[i],"email":req.body.member_email[i]};
		}
	}

	log.debug("Member_brief object = " + team_details.team_member);

	console.log(req.file);
	team_details.PDF_name = req.file != undefined ? req.file.filename:null;
	team_details.PDF_path = req.file != undefined ? req.file.path:null;
	return doc;//doc is already an object
}

function file_handler(req,res,field_name,callback){ // upload the bp file if there is any
	
	var upload = multer({ storage: storage1 }).single(field_name); // declare a multer object
	upload(req,res,function(err){
		if(err){
			log.error('Unexpected error');
			log.error(err);
		}else{
			log.info('file uploaded.');
			log.debug('read file'+ req.file);
			callback(null,req,res);	
		}
		
	});

}

exports.to_object = to_object;  //enter a json varible when call the function  
exports.file_handler = file_handler;
