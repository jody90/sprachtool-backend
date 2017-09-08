const KeyModel = require("../models/key.model");
const GLOBAL = require(__base + "/globals");
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

const KeyService = {
    getAllKeys: function(callback) {
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);

            var collection = db.collection('keys');

            collection.find({}, {_id: 0}).toArray(function (err, docs) {
                assert.equal(err, null);
                callback(docs);
                db.close();
            });
        });
        // var tKeys = [
        //     new KeyModel("jody.test", [{language: "DE", value: "jody test DE"}], new Date().getTime(), new Date().getTime()),
        //     new KeyModel("jody.hey", [{language: "DE", value: "jody hey DE"}, {language: "EN", value: "jody hey DE"}], new Date().getTime(), new Date().getTime()),
        // ]
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
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);
            var collection = db.collection('keys');
            collection.insert(data, function (err, result) {
                assert.equal(err, null);
                console.log("Inserted 1 documents into the collection");
                callback(result);
            });
        });
    }
}

module.exports = KeyService;
