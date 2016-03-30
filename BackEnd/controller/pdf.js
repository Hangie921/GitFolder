var fs = require('fs')

function route(app, mongoClient) {
    app.get('/pdf/:path', function(req, res) {
        var filename = req.params.path;
        console.log(filename)
        fs.readFile(__dirname + filename , function (err,data){
            res.contentType("application/pdf");
            res.send(data);
        });
    });
}

exports.route = route;
