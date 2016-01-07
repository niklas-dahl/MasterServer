var exec = require('child_process').exec;

function spawnServer (command, name) {
    // script.js
    var child = exec(command);

    if(name) {
        child.stdout.on('data', function(data) {
            console.log('CHILD_LOG ' + name + " stdout " + data);
        });

        child.stderr.on('data', function(data) {
            console.log('CHILD_LOG ' + name + " stderr " + data);
        });

        child.on('close', function(code) {
            console.log("CHILD_LOG " + name + " exitCode " + data);
        });
    }

    return child;
}

modules.export = spawnServer;