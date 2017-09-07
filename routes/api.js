const express = require("express");
const router = express.Router();
const keySerivce = require("../services/KeyService");

router.get('/v1/keys', function(req, res) {
    res.send(keySerivce.getAllKeys());
})

router.get('/v1/key/:id', function(req, res) {
	// TODO
    res.send(keySerivce.getAllKeyById());
})

router.post('/v1/key/:id', function(req, res) {
    console.log("post key");
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