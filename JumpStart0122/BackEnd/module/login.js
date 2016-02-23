var md5 = require('../module/md5'),
	multer = require('multer'),
	form = multer();




function checkDetail(detail,cursor){ //check empty in the page
	var result = cursor.limit(1).forEach(function(doc){
		if(detail.acc === doc.acc && detail.psw === doc.psw){
			return true;	
		}else{
			return false;
		}	
	});
	setTimeout(function(result){
		return result;
	}, 1000);
}



function updateDetail(){ //update last_login_time , write session

}

exports.check = checkDetail;
exports.update = updateDetail;