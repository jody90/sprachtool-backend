var bunyan = require('bunyan');
var Elasticsearch = require('bunyan-elasticsearch');
var esStream = new Elasticsearch({
    indexPattern: '[logstash-]YYYY.MM.DD_HH:MM:SS',
    type: 'logs',
    host: 'zuscodeninja1.sortimo.de:9200'
});
esStream.on('error', function (err) {
    console.log('Elasticsearch Stream Error:', err.stack);
});

var logger = bunyan.createLogger({
    name: "My Application",
    streams: [
        { stream: process.stdout },
        { stream: esStream }
    ],
    serializers: bunyan.stdSerializers
});

logger.info('Starting application on port %d', "12345");
logger.error('Foobar Error occured!');



// const bunyan = require('bunyan');
// const ElasticsearchStream = require('bunyan-stream-elasticsearch');

// var log = bunyan.createLogger({name: "myapp"});
// log.info("hi");

// const writeCallback = entry => {
//     // modify entry values
//     entry.myProperty = 'my value';
//     return entry;
// };

// const esStream = new ElasticsearchStream({
//     indexPattern: 'rock',
//     type: 'logs',
//     host: 'zuscodeninja1.sortimo.de:9200',
//     defaultTemplate: {
//         "mappings": {
//             "_default_": {
//                 "dynamic_templates": [
//                     {
//                         "message_field": {
//                             "path_match": "message",
//                             "match_mapping_type": "string",
//                             "mapping": {
//                                 "type": "text",
//                                 "norms": false
//                             }
//                         }
//                     },
//                     {
//                         "string_fields": {
//                             "match": "*",
//                             "match_mapping_type": "string",
//                             "mapping": {
//                                 "type": "text",
//                                 "norms": false,
//                                 "fields": {
//                                     "keyword": {
//                                         "type": "keyword",
//                                         "ignore_above": 256
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 ],
//                 "properties": {
//                     "@timestamp": {
//                         "type": "date"
//                     },
//                     "@version": {
//                         "type": "keyword"
//                     },
//                     "geoip": {
//                         "dynamic": true,
//                         "properties": {
//                             "ip": {
//                                 "type": "ip"
//                             },
//                             "location": {
//                                 "type": "geo_point"
//                             },
//                             "latitude": {
//                                 "type": "half_float"
//                             },
//                             "longitude": {
//                                 "type": "half_float"
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     },
//     writeCallback,
// });
// // manage error case
// esStream.on('error', err => console.log('Buyan Stream Elasticsearch Error:', err.stack));
// // Create the logger itself
// const logger = bunyan.createLogger({
//     name: "My Application",
//     streams: [
//         // default stream to console
//         {
//             stream: process.stdout
//         },
//         // and to Elasticsearch
//         {
//             stream: esStream
//         }
//     ],
//     serializers: bunyan.stdSerializers
// });
// // start logging
// logger.info('Starting application on port');