var fs = require('fs');
var Team = require('../module/team.js');
var csv = require('express-csv');

function route(app, mongoClient) {
    app.get('/download/csv', function(req, res) {
        console.log("/download/csv");
        Team.show(function(teams) {
            var title = ["報名序號", "隊名", "姓名", "Mail", "手機", "報名表", "報名時間", "付錢沒", "最後編輯者＆編輯時間"];

            var output = ["22", "eee", "222"];
            var s = '報名序號'
            var buf = new Buffer(s);
            console.log(buf);

            var content = buf;

            res.set('Content-Type', 'text/csv; charset=utf-8');
            res.set("Content-Disposition", "attachment;filename=teams.csv");

            res.write(new Buffer('EFBBBF', 'hex')) // For excel, need BOM
            res.end(content);
        })
    });
    // @Todo: let admin can download/review pdfs
    app.get('/download/pdf/:path', function(req, res) {
        var filename = req.params.path;
        console.log(filename)
        fs.readFile(__dirname + filename, function(err, data) {
            res.contentType("application/pdf");
            res.send(data);
        });
    });

}

exports.route = route;
