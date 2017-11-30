const GLOBAL = require(__base + "/globals");
const mongo = require('mongodb').MongoClient;
const LogService = require(__base + "/logging/LogService");
const logger = new LogService(GLOBAL.logName, __filename).createLogger();

const KeyService = {
    getAllKeys: function(callback) {
        mongo.connect(GLOBAL.url, function (err, db) {

            if (err) {
                logger.error(err, arguments.callee.name);
                return false;
            }

            var collection = db.collection('keys');

            collection.find({}, {_id: 0}).sort({_id: -1}).toArray(function (err, docs) {

                if (err) {
                    logger.error(err);
                    return false;
                }

                callback(docs);
                db.close();
            });
        });
    },
    getKeyById: function(id, callback) {
        mongo.connect(GLOBAL.url, function (err, db) {

            if (err) {
                logger.error(err);
                return false;
            }

            var collection = db.collection('keys');

            collection.find({key: id}, {_id: 0}).toArray(function (err, docs) {

                if (err) {
                    logger.error(err);
                    return false;
                }

                callback(docs);
                db.close();
            });
        });
    },
    insertKey: function(data, callback) {
        
        logger.info("insert: ", data);
        
        var that = this;

        if (data.key != null) {
            mongo.connect(GLOBAL.url, function (err, db) {

                if (err) {
                    logger.error(err);
                    return false;
                }

                var collection = db.collection('keys');
                collection.update({key: data.key}, data, {upsert: true}, function (err, result) {
                    db.close();
                    callback(result);
                });
            });
        }
        else {
            var retrun = {
                result: {
                    n: 0
                }
            }
            callback(retrun);
        }
    },
    updateKey: function(keyId, data, callback) {
        if (keyId) {
            mongo.connect(GLOBAL.url, function (err, db) {

                if (err) {
                    logger.error(err);
                    return false;
                }

                var collection = db.collection('keys');

                collection.replaceOne({key: keyId}, data, function (err, result) {

                    if (err) {
                        logger.error(err);
                        return false;
                    }

                    console.log("Updated 1 documents into the collection");
                    db.close();

                    callback(result);
                });
            });
        }
        else {
            var retrun = {
                result: {
                    nModified: 0
                }
            }
            callback(retrun);
        }
    },
    deleteKey: function(keyId, callback) {
        mongo.connect(GLOBAL.url, function (err, db) {

            if (err) {
                logger.error(err);
                return false;
            }

            var collection = db.collection('keys');

            collection.remove({key: keyId}, function (err, result) {

                if (err) {
                    logger.error(err);
                    return false;
                }

                logger.info("Deleted 1 document in the collection");
                db.close();
                callback(result);
            });
        });
    }
}

module.exports = KeyService;
