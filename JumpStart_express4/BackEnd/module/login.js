var encrypt = require('../module/encrypt'),
	multer = require('multer'),
	form = multer();




function checkDetail(detail,doc){ /*check if empty in the page*/
	console.log( detail.length);
	console.log(doc);
	if(detail.acc == doc[0].acc && encrypt.md5(detail.psw) === doc[0].psw){
		return true;	
	}else{
		return false;
	}	
}



function updateDetail(){ //update last_login_time , write session

}

exports.check = checkDetail;
exports.update = updateDetail;