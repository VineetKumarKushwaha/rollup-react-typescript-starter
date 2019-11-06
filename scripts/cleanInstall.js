const { exec } = require("child_process");

const cleanDependencies = async () => {
    const child = exec('find . -type d -regex ".*/[node_modules]"');
    child.stdout.on('data', function(data) {
        const files = data.split("\n");
        files.forEach(file => {
            if (file.indexOf("node_modules") > -1) {
                const folder = file.replace(/node_modules.+/g,"$'");
                console.log(`Clearing node_modules from ${folder}node_modules`);
                console.log(`rm -rf ${folder}node_modules`);
                const childP = exec('rm -rf ${folder}node_modules');
                childP.stdout.on('data', function(data) {
                    process.stdout.write(data);
                    console.log("=============cleared============");
                });
                childP.stderr.on('data', function(data) {
                    process.stdout.write(data);
                });
            }
        });
        // process.stdout.write(data);
    });
    child.stderr.on('data', function(data) {
        process.stdout.write(data);
    });
}

cleanDependencies();