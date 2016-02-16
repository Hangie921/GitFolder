var log4js = require('log4js');
log4js.configure("../FrontEnd/config/error_handler_config.json");

function logInfo(msg){
	var logger = log4js.getLogger('info');
	logger.info(msg);
}
function logDebug(msg){
	var logger = log4js.getLogger('debug');
	logger.debug(msg);
}

function logError(msg){
	var logger = log4js.getLogger('error');
	logger.error(msg);
	
}

exports.info = logInfo;
exports.debug = logDebug;
exports.error = logError;
