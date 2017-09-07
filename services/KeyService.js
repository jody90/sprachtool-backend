const KeyModel = require("../models/key.model");

const KeyService = {
    getAllKeys: function() {
        var tKeys = [
            new KeyModel("jody.test", [{language: "DE", value: "jody test DE"}], new Date().getTime(), new Date().getTime()),
            new KeyModel("jody.hey", [{language: "DE", value: "jody hey DE"}, {language: "EN", value: "jody hey DE"}], new Date().getTime(), new Date().getTime()),
        ]
        return tKeys;
    }
}

module.exports = KeyService;