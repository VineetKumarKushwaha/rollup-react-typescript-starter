const
    fs = require("fs"),
    path = require('path'),
    { exec, execFile, execSync} = require('child_process');

const getPromise = () => {
    return new Promise((resolve, reject) => {
        exec('find . ! -path "*node_modules*" | grep "package.json"', (error , stdout, stderr) => {
            if (error) {
                reject(stderr);
            }
            resolve(stdout || stderr);
        })
    });
}

const npmInstallRecusively = async () => {
    const
        root = process.cwd(),
        file = path.join(root, 'package.json');

    const data = await getPromise();
    const ary = data.split("\n").filter(a => !!a && a !== "./package.json");
    ary.forEach(element => {
        const url = element.replace("package.json", "");
        console.info(`npm --prefix ${url} i ${url}`);
        const child = exec(`npm --prefix ${url} i ${url}`);
        console.info(`installing packages from ${element}...`);
        child.stdout.on('data', function(data) {
            process.stdout.write(data);
        });
        child.stderr.on('data', function(data) {
            process.stdout.write(data);
        });
    });
}

npmInstallRecusively();