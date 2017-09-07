module.exports = class KeyModel {

    constructor(key, translations, createdAt, modifiedAt) {
        this.key = key;
        this.translations = translations;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}