var bunyan = require('bunyan');
var Elasticsearch = require('bunyan-elasticsearch');

var esStream = new Elasticsearch({
    indexPattern: '[logstash-]YYYY.MM.DD_HH:MM:SS',
    type: 'logs',
    host: 'zuscodeninja1.sortimo.de:9200'
})

esStream.on('error', function (err) {
    console.log('Elasticsearch Stream Error:', err.stack);
})

class LogService {
    
    constructor(name, file) {
        this.name = name;
        this.file = file;
    }    

    createLogger() {
        return bunyan.createLogger({
            name: this.name,
            streams: [
                { stream: process.stdout },
                { stream: esStream }
            ],
            serializers: bunyan.stdSerializers,
            filename: this.file
        })
    }

}

module.exports = LogService;