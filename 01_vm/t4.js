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

let TARGET_PATH = path.resolve('./data/user_info/handle_modules/success_require/index.js');

fs.readFile(TARGET_PATH, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);

    // let functionInSandbox = vm.run(data, __filename);
    let functionInSandbox = vm.run(data, TARGET_PATH);

    console.log('====result====', functionInSandbox());
});
