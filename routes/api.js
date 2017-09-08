const express = require("express");
const router = express.Router();
const keySerivce = require(__base + "/services/KeyService");

router.get('/v1/keys', function(req, res) {
    keySerivce.getAllKeys(function(data) {
        res.send(data);
    });
})

router.get('/v1/key/:id', function(req, res) {
    var id = req.params.id;
    keySerivce.getKeyById(id, function(data) {
        if (data.length > 0) {
            res.status(200).send(data);
        }
        else {
            res.status(404).send("Id " + id + " not found");
        }
    })
})

router.post('/v1/key/:id', function(req, res) {
    keySerivce.insertKey(req.body, function(data) {
        console.log(data);
    });
    // console.log(req.body);
    // var collection = db.collection('keys');
    // collection.insert(req.body, function (err, result) {
    //     assert.equal(err, null);
    //     console.log("Inserted 1 documents into the collection");
    //     callback(result);
    // });
})

router.put('/v1/key/:id', function(req, res) {
    console.log("put key");
})

router.delete('/v1/key/:id', function(req, res) {
    console.log("delete key");
})

router.get('/v1/languages', function(req, res) {
    console.log("get languages");
})

module.exports = router;
