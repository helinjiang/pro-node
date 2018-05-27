const fs = require('fs');
const path = require('path');
const vm = require('vm');
const errorNotLogin = require('./data/user_info/handle_modules/error_not_login/index.js');

console.log(errorNotLogin())

fs.readFile(path.resolve('./data/user_info/handle_modules/error_not_login/index.js'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);

    vm.runInThisContext(data)(require);
});