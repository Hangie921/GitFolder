var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var teamSchema = new mongoose.Schema({
    _id: ObjectId,
    team_details: {
        team_name: String,
        team_category: String,
        team_leader_name: String,
        leader_email: String,
        mobile: String,
        agree_subscribe: Boolean,
        agree_terms: Boolean,
        team_member: Schema.Types.Mixed,
        reg_time: Date,
        paid: Boolean
    },
    admin_detail: {
        last_editor_id: String,
        last_edit_time: Date
    },
    pdf: {
        path: String,
        name: String
    }
}, { collection: 'application' });

// 第三個參數可以強制指定collection不是複數
var Team = mongoose.model('Application', teamSchema);


exports.show = function show(callback) {
    Team.find(function(err, teams) {
        if (err) return console.error(err);
        callback(teams);
    })
}

exports.findById = function findById(id, callback) {
    Team.findById(id, function(err, team) {
        if (err) return console.error(err);
        callback(null,team);
    })
}

exports.findByIdAndUpdate = function findById(id, doc, callback) {
    Team.findByIdAndUpdate(id, {$set: doc}, function(err, team) {
        if (err) return console.error(err);
        callback(null,team);
    });
}
