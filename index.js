global.__base = __dirname;

const express = require("express");
const routes = require("./routes/api");
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const GLOBAL = require('./globals');
const bodyParser = require('body-parser');

// console.log(GLOBAL.url);

// Use connect method to connect to the server


// var insertDocuments = function (db, callback) {
//     // Get the documents collection
//     var collection = db.collection('documents');
//     // Insert some documents
//     collection.insertMany([
//         { a: 1 }, { a: 2 }, { a: 3 }
//     ], function (err, result) {
//         assert.equal(err, null);
//         assert.equal(3, result.result.n);
//         assert.equal(3, result.ops.length);
//         console.log("Inserted 3 documents into the collection");
//         callback(result);
//     });
// }

// mongo.connect(GLOBAL.url, function (err, db) {
//     assert.equal(null, err);
//
//     var collection = db.collection('keys');
//
//     insertDocuments(db, function() {
//         db.close();
//     })
// });

var findDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('keys');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}

var insertDocuments = function (db, callback) {
    var collection = db.collection('keys');
    collection.insertMany([
        {
            key: "jody.test",
            translations: [{
                language: "DE",
                value: "jody test DE"
            }],
            createdAt: new Date().getTime(),
            modifiedAt: new Date().getTime()
        },
        {
            key: "jody.hey",
            translations: [{
                language: "DE",
                value: "jody hey DE"
            }],
            createdAt: new Date().getTime(),
            modifiedAt: new Date().getTime()
        }
    ], function (err, result) {
        assert.equal(err, null);
        console.log("Inserted 2 documents into the collection");
        callback(result);
    });
}

//CORS middleware
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
}

// setup express app
const app = express();
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api", routes);

var port = process.env.port || 5000;

app.listen(port, function (req, res) {
    console.log("App runs at Port " + port);
})
