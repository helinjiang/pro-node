const fs = require('fs');
const path = require('path');

const { NodeVM } = require('vm2');

const vm = new NodeVM({
    sandbox: {},
    require: {
        external: true,
        builtin: ['fs', 'path'],
        root: './'
    }
});

fs.readFile(path.resolve('./data/user_info/handle_modules/error_not_login/index.js'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);

    let functionInSandbox = vm.run(data);

    console.log('====result====', functionInSandbox());
});
