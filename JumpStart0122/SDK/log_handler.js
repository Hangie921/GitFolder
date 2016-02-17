//This is the log module that log basic info , debug and error information
//to the file that is set in the error_handler_config.json

var log4js = require('log4js');
log4js.configure("../FrontEnd/config/log_handler_config.json");

function logInfo(msg){
	var logger = log4js.getLogger('info');
	logger.info(msg);
}
function logDebug(msg){
	var logger = log4js.getLogger('debug');
	logger.setLevel('info');   //cancel this line would start to log the debug msg
	logger.debug(msg);
}

function logError(msg){
	var logger = log4js.getLogger('error');
	logger.error(msg);
	
}

exports.info = logInfo;
exports.debug = logDebug;
exports.error = logError;
