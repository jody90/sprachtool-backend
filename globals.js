const ARGS = process.argv.slice(2);

switch (ARGS[0]) {
    case "codeninja" :
        var sshPrivateKeyPath = '/data/ssh/id_rsa'
        var host = '172.22.2.15';
        var username = 'sortimo';
        var pathTest = '/home/sortimo/sprachtool-files/test';
        var pathLive = '/home/sortimo/sprachtool-files/live';
        var mongoUrl = 'mongodb://mongodb:27017/myproject';
    break;
    case "local" :
        var sshPrivateKeyPath = 'C:/Users/jlerch/.ssh/private_key.ppk';
        var host = '46.101.169.145';
        var username = 'root';
        var pathTest = '/var/www/html/test';
        var pathLive = '/var/www/html/live';
        var mongoUrl = 'mongodb://172.22.2.159:27017/myproject';
    break;
    default:

}

var Globals = {
    url: mongoUrl,
    sshPrivateKeyPath: sshPrivateKeyPath,
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
