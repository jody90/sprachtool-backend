const ARGS = process.argv.slice(2);

switch (ARGS[0]) {
    case "codeninja" :
        var sshPrivateKeyPath = '/data/ssh/id_rsa'
        var host = '172.22.2.158';
        var username = 'sortimo';
        var pathTest = '/home/sortimo/sprachtool-files/test';
        var pathLive = '/home/sortimo/sprachtool-files/live';
    break;
    case "local" :
        var sshPrivateKeyPath = 'C:/Users/jlerch/.ssh/private_key.ppk';
        var host = '172.22.2.158';
        var username = 'sortimo';
        var pathTest = '/home/sortimo/sprachtool-files/test';
        var pathLive = '/home/sortimo/sprachtool-files/live';
    break;
    default:

}

var Globals = {
    url: 'mongodb://mongodb:27017/myproject',
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
