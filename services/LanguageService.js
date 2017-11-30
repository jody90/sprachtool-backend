const GLOBAL = require(__base + "/globals");
const mongo = require('mongodb').MongoClient;

const LanguageService = {
    getAllLanguages: function(callback) {

        var languagesArray = [];

        mongo.connect(GLOBAL.url, function (err, db) {
            
            if (err) {
                logger.error(err);
                return false;
            }

            var collection = db.collection('languages');

            collection.find({}, {_id: 0}).toArray(function (err, docs) {

                if (err) {
                    logger.error(err);
                    return false;
                }

                for (var lang in docs) {
                    languagesArray.push(docs[lang].language);
                }
                callback(languagesArray);
                db.close();
            });
        });
    },
    insertLanguage: function(data, callback) {
        mongo.connect(GLOBAL.url, function (err, db) {

            if (err) {
                logger.error(err);
                return false;
            }

            var collection = db.collection('languages');
            collection.update({language: data.language}, data, {upsert: true}, function (err, result) {

                if (err) {
                    logger.error(err);
                    return false;
                }

                logger.info("Inserted 1 documents into the collection");
                callback(result);
            });
        });
    },
    deleteLanguage: function(lang, callback) {
        mongo.connect(GLOBAL.url, function (err, db) {

            if (err) {
                logger.error(err);
                return false;
            }

            var collection = db.collection('languages');

            collection.remove({language: lang}, function (err, result) {

                if (err) {
                    logger.error(err);
                    return false;
                }

                logger.info("Deleted 1 document from the collection");
                callback(result);
            });
        });
    }
}

module.exports = LanguageService;
