'use strict';

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (var i = 0; i < 2; i++) {
		cluster.fork();
	}
    Object.keys(cluster.workers).forEach(function(id) {
        console.log('I am running with ID : ' + cluster.workers[id].process.pid);
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died');
    });
}
else{
	require('./framework/app')();
}
