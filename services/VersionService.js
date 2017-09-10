const GLOBAL = require(__base + "/globals");
const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const fs = require("fs");

const VersionService = {
    addVersion: function(data, keys, callback) {
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);
            var collection = db.collection('versions');

            var version = {
                title: data.title,
                description: data.description,
                environment: null,
                keys: keys,
                createdAt: new Date().getTime()
            }

            collection.insert(version, function (err, result) {
                assert.equal(err, null);
                callback(result);
                db.close();
            });

        });
    },
    createFile: function(keys, language, destination, versionId) {
        var that = this;
        this.getLocalizedKeys(keys, language, function(localizedKeys) {
            var filePath = "Temp/" + destination + "/";

            for (let lang in localizedKeys) {

                var fileName = "base_" + lang + ".txt";
                var file = filePath + fileName;
                // var stream = fs.createWriteStream(file, {flags: 'w+', overwrite: true});

                var text = "";

                for (let key in localizedKeys[lang]) {
                    text += key + " = " + localizedKeys[lang][key] + "\n";
                }

                fs.writeFileSync(file, text);

                that.setCurrentEnvironment(versionId, destination, lang, function(result) {
                    console.log(result);
                })
            }
        });


        // TODO upload File to Server
    },
    getLocalizedKeys: function(keys, language, callback) {
        var languages = language.split(",");

        var localizedKeys = {};

        // for every requested language get keys
        for (let i in languages) {
            localizedKeys[languages[i]] = {};
            // for every key get translations
            for (var k in keys) {
                var translations = keys[k].translations;
                // for every translation check if value is set for requested language
                for (let t in translations) {
                    if (translations[t].language == languages[i]) {
                        localizedKeys[languages[i]][keys[k].key] = translations[t].value;
                    }
                }
            }
        }

        callback(localizedKeys);
    },
    publishVersion: function(versionId, language, destination) {
        var that = this;
        that.getVersionById(versionId, function(version) {
            that.createFile(version[0].keys, language, destination, versionId);
        })

    },
    getVersionById: function(versionId, callback) {
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);

            var collection = db.collection('versions');

            var oId = new ObjectId(versionId);

            collection.find({_id: oId}).toArray(function (err, docs) {
                assert.equal(err, null);
                callback(docs);
                db.close();
            });
        });
    },
    getAllVersions: function(callback) {
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);

            var collection = db.collection('versions');

            collection.find({}).sort({_id: -1}).toArray(function (err, docs) {
                assert.equal(err, null);
                callback(docs);
                db.close();
            });
        });
    },
    setCurrentEnvironment: function(versionId, environment, language, callback) {
        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);

            var collection = db.collection('versions');

            var envObject = {};
            envObject[environment] = ["DE", "EN"];

            var oId = new ObjectId(versionId);

            var query = {};
            query["environment." + environment] = language;
            // query.environment[environment] = "DE";

            // var query = "{environment." + environment + ":'DE'}";
            // console.log(query);


            // collection.find({query}).toArray(function (err, docs) {
            //     assert.equal(err, null);
            //     console.log(docs[0]);
            //     // callback(docs);
            //     db.close();
            // });

            query["environment." + environment] = "DE";

            collection.update({}, {$pull: {query}}, function (err, docs) {
                assert.equal(err, null);
                console.log(docs[0]);
                // callback(docs);
                db.close();
            });



            // collection.update({_id: oId}, {$set: {environment: envObject}}, function (err, docs) {
            //     assert.equal(err, null);
            //     callback(docs.result);
            //     db.close();
            // });
        });
    }

}

module.exports = VersionService;
