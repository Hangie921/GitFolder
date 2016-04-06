var fs = require('fs');
var Team = require('../module/team.js');

function jsonTocsv(teams) {
    var obj = "";
    var title = ["報名序號", "隊名", "姓名", "Mail", "手機", "報名表", "報名時間", "付錢沒", "最後編輯者＆編輯時間"];
    obj += title.join();
    console.log(teams)
    for (var index in teams) {
        var team = teams[index];
        var row = title;
        row[0] = team._id;
        row[1] = team.team_details.team_name;
        if (team.team_details.team_category === "student") {
            row[1] = 'S ' + row[1];
        }
        row[2] = '* ' + team.team_details.team_leader_name;
        row[3] = team.team_details.leader_email;
        row[4] = team.team_details.mobile;
        row[5] = team.team_details.PDF_name;
        row[6] = team.team_details.reg_time;
        row[7] = team.team_details.paid;
        row[8] = team.admin_detail.last_editor_id;
        obj += "\n" + row.join();

        row[4] = null;
        row[5] = null;
        row[6] = null;
        row[7] = null;
        row[8] = null;

        for (var m_index in team.team_details.team_member) {
            var member = team.team_details.team_member[m_index];
            row[2] = member.name;
            row[3] = member.email;

            obj += "\n" + row.join();
        }
    }
    return obj;
}

function route(app, mongoClient) {
    app.get('/download/csv', function(req, res) {
        console.log("/download/csv");
        Team.show(function(teams) {

            var csv = jsonTocsv(teams);
            // var content = new Buffer(teams[0].team_details.team_leader_name);
            var content = new Buffer(csv);

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
