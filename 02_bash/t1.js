const callfile = require('child_process');
const config = require('./config');

let params = [];

Object.getOwnPropertyNames(config).forEach(function (key) {
    params.push(' --' + key + '=');
    params.push(config[key]);
});
console.log(params);

callfile.execFile('./q.sh', params, null, function (error, stdout, stderr) {
    if (error) {
        throw error;
    }
    console.log(stdout);
});
