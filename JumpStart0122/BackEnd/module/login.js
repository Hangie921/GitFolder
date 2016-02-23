var md5 = require('../module/md5'),
	multer = require('multer'),
	form = multer();




function checkDetail(detail,doc){ //check empty in the page
	console.log(doc[2]);
	for(var i=0;i<doc.length;i++){
		console.log(doc[i]);
	}
		if(detail.acc === doc[0].acc && detail.psw === doc[0].psw){
			return true;	
		}else{
			return false;
		}	
}



function updateDetail(){ //update last_login_time , write session

}

exports.check = checkDetail;
exports.update = updateDetail;