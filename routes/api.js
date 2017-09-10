const express = require("express");
const router = express.Router();
const keySerivce = require(__base + "/services/KeyService");

router.get('/v1/keys', function(req, res) {
    console.log("getAllKeys")
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
        if (data.result.n == 1) {
            res.status(200).send();
        }
        else {
            res.status(500).send();
        }
    });
})

router.put('/v1/key/:id', function(req, res) {
    keySerivce.updateKey(req.params.id, req.body, function(data) {
        if (data.result.nModified == 1) {
            res.status(200).send();
        }
        else {
            res.status(500).send();
        }
    });
})

router.delete('/v1/key/:id', function(req, res) {
    keySerivce.deleteKey(req.params.id, function(data) {
        if (data.result.n == 1) {
            res.status(200).send();
        }
        else {
            res.status(500).send();
        }
    });
})

router.get('/v1/languages', function(req, res) {
    console.log("get languages");
})

module.exports = router;
