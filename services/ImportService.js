const GLOBAL = require(__base + "/globals");
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const keySerivce = require(__base + "/services/KeyService");

const ImportService = {
    insertFromFile: function(filedata, counter, language) {

        var that = this;

        var tItem = filedata[0].split("=");

        var data = {
            key: tItem[0].trim(),
            translations: [
                {
                    language: language,
                    value: tItem[1] != undefined ? tItem[1].trim() : tItem[1],
                    modifiedAt: new Date().getTime()
                }
            ],
            createdAt: new Date().getTime(),
            modifiedAt: new Date().getTime()
        }

        keySerivce.insertKey(data, function() {
            if (filedata.length > 1) {
                counter++;
                filedata.splice(0, 1);
                console.log("counter: ", counter);
                console.log("Inserted", data.key);
                setTimeout(function() {
                    that.insertFromFile(filedata, counter, language);
                }, 20);
            }
            else {
                console.log("fertig")
            }
        })
    },
    addTranslation: function(filedata, counter, language) {

        var that = this;

        var tItem = filedata[0].split("=");

        var key = tItem[0].trim();

        var query = {};
        query["translations"] = {
            language: language,
            value: tItem[1] != undefined ? tItem[1].trim() : tItem[1],
            modifiedAt: new Date().getTime()
        };

        mongo.connect(GLOBAL.url, function (err, db) {
            assert.equal(null, err);

            var collection = db.collection('keys');

            console.log(query);

            // collection.update({}, {$pull: { "language": "de" }}, {multi: true}, function (err, result) {
                // assert.equal(err, null);

                collection.update({key: key}, {$addToSet: query}, function (err, docs) {
                    assert.equal(err, null);
                    if (filedata.length > 1) {
                        counter++;
                        filedata.splice(0, 1);
                        console.log("counter: ", counter);
                        console.log("Inserted", query);
                        db.close();
                        setTimeout(function() {
                            that.addTranslation(filedata, counter, language);
                        }, 20);
                    }
                    else {
                        console.log("fertig")
                    }
                });
            });
        // });
        //
        // keySerivce.insertKey(data, function() {
        //     if (filedata.length > 0) {
        //         counter++;
        //         filedata.splice(0, 1);
        //         console.log("counter: ", counter);
        //         console.log("Inserted", data.key);
        //         setTimeout(function() {
        //             that.insertFromFile(filedata, counter, language);
        //         }, 50);
        //     }
        //     else {
        //         console.log("fertig")
        //     }
        // })
    }

}

module.exports = ImportService;
