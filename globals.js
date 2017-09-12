var Globals = {
    // url: 'mongodb://127.0.0.1:27017/myproject'
    url: 'mongodb://172.22.2.159:27017/myproject',
    sshPrivateKeyPath: 'C:/Users/jlerch/.ssh/private_key.ppk',
    sshDestinations: {
        test: {
            host: '172.22.2.159',
            username: 'sortimo',
            path: '/home/sortimo/sprachtool-files/test'
        },
        live: {
            host: '172.22.2.159',
            username: 'sortimo',
            path: '/home/sortimo/sprachtool-files/live'
        }
    }
}

module.exports = Globals;
