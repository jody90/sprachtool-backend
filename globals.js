const ARGS = process.argv.slice(2);

switch (ARGS[0]) {
    case "codeninja" :
        var sshPrivateKeyPath = '/data/ssh/id_rsa'
        var host = '10.255.48.21';
        var username = 'sortimo';
        var pathTest = '/cache/sprachtool/test';
        var pathLive = '/cache/sprachtool/live';
        var mongoUrl = 'mongodb://mongodb:27017/myproject';
        var logName = 'prod-sprachtool-backend';        
    break;
    case "codeninja-dev" :
        var sshPrivateKeyPath = '/data/ssh/id_rsa'
        var host = '10.255.48.21';
        var username = 'sortimo';
        var pathTest = '/cache/sprachtool/test';
        var pathLive = '/cache/sprachtool/live';
        var mongoUrl = 'mongodb://mongodb-dev/myproject-dev';
        var logName = 'dev-sprachtool-backend';        
    break;
    case "local" :
        var sshPrivateKeyPath = 'C:/Users/jlerch/.ssh/private_key.ppk';
        var host = '165.227.163.32';
        var username = 'root';
        var pathTest = '/var/www/html/test';
        var pathLive = '/var/www/html/live';
        var mongoUrl = 'mongodb://172.22.2.159:27018/myproject-dev';
        var logName = 'local-sprachtool-backend';
    break;
    default:

}

var Globals = {
    url: mongoUrl,
    sshPrivateKeyPath: sshPrivateKeyPath,
    logName: logName,
    sshDestinations: {
        test: {
            host: host,
            username: username,
            path: pathTest
        },
        live: {
            host: host,
            username: username,
            path: pathLive
        }
    }
}

module.exports = Globals;
