const GLOBAL = require(__base + "/globals");
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

const KeyService = {
    getAllKeys: function(callback) {
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);

            var collection = db.collection('keys');

            collection.find({}, {_id: 0}).sort({_id: -1}).toArray(function (err, docs) {
                assert.equal(err, null);
                callback(docs);
                db.close();
            });
        });
    },
    getKeyById: function(id, callback) {
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);

            var collection = db.collection('keys');

            collection.find({key: id}, {_id: 0}).toArray(function (err, docs) {
                assert.equal(err, null);
                callback(docs);
                db.close();
            });
        });
    },
    insertKey: function(data, callback) {
        console.log(data);
        var that = this;
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);
            var collection = db.collection('keys');
            collection.update({key: data.key}, data, {upsert: true}, function (err, result) {
                db.close();
                callback(result);
            });
        });
    },
    updateKey: function(keyId, data, callback) {
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);
            var collection = db.collection('keys');

            collection.replaceOne({key: keyId}, data, function (err, result) {
                assert.equal(err, null);
                console.log("Updated 1 documents into the collection");
                db.close();

                callback(result);
            });
        });
    },
    deleteKey: function(keyId, callback) {
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);
            var collection = db.collection('keys');

            collection.remove({key: keyId}, function (err, result) {
                assert.equal(err, null);
                console.log("Deleted 1 documents into the collection");
                db.close();
                callback(result);
            });
        });
    }
}

module.exports = KeyService;
