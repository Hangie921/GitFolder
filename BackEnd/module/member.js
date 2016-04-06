var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var memberSchema = new mongoose.Schema({
    _id: ObjectId,
    acc: String,
    psw: String
}, { collection: 'member' });

// 第三個參數可以強制指定collection不是複數
var Member = mongoose.model('member', memberSchema);


exports.show = function show(callback) {
    Member.find(function(err, members) {
        if (err) return console.error(err);
        callback(members);
    })
}

exports.findOne = function find(doc, callback) {
    Member.findOne(doc, function(err, member) {
        if (err) return console.error(err);
        callback(null, member);
    })
}

exports.findById = function findById(id, callback) {
    Member.find(id, function(err, member) {
        if (err) return console.error(err);
        callback(null, member);
    })
}

exports.findById = function findById(id, callback) {
    Member.findById(id, function(err, member) {
        if (err) return console.error(err);
        callback(null, member);
    })
}

exports.findByIdAndUpdate = function findById(id, doc, callback) {
    Member.findByIdAndUpdate(id, { $set: doc }, function(err, member) {
        if (err) return console.error(err);
        callback(null, member);
    });
}
