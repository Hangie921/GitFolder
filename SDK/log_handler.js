//This is the log module that log basic info , debug and error information
//to the file that is set in the error_handler_config.json
var path = require("path");
var log4js = require('log4js');
var dir_path = path.dirname(path.dirname(process.argv[1])) + '/logs';
var fs = require('fs');
var node_fs = require('node-fs');

var dir_backend = dir_path + '/backend';
console.log(dir_backend);

node_fs.mkdirSync(dir_backend, 0770, true);

function checkFile(filename) {
    fs.stat(filename, function(err, stat) {
        if (err == null) {
            console.log('File exists');
        } else if (err.code == 'ENOENT') {
            fs.writeFile(filename, '');
        } else {
            console.log('Some other error: ', err.code);
        }
    });
}

checkFile(dir_backend + '/info.log');
checkFile(dir_backend + '/debug.log');
checkFile(dir_backend + '/errors.log');

log4js.configure({
    "appenders": [{
        "type": "file",
        "filename": path.join(dir_backend, "info.log"),
        "maxLogSize": 20480,
        "backups": 3,
        "category": "info"
    }, {
        "type": "file",
        "filename": path.join(dir_backend, "debug.log"),
        "maxLogSize": 20480,
        "backups": 3,
        "category": "debug"
    }, {
        "type": "logLevelFilter",
        "level": "ERROR",
        "appender": {
            "type": "file",
            "filename": path.join(dir_backend, "errors.log")
        }
    }]
});





function logInfo(msg) {
    var logger = log4js.getLogger('info');
    logger.info(msg);
}

function logDebug(msg) {
    var logger = log4js.getLogger('debug');
    logger.setLevel('info'); //cancel this line would start to log the debug msg
    logger.debug(msg);
}

function logError(msg) {
    var logger = log4js.getLogger('error');
    logger.error(msg);

}

exports.info = logInfo;
exports.debug = logDebug;
exports.error = logError;
