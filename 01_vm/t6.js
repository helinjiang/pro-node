const fs = require('fs');
const path = require('path');
const babel = require('babel-core');

const { NodeVM } = require('vm2');

const vm = new NodeVM({
    sandbox: {},
    require: {
        external: true,
        builtin: ['fs', 'path']
    },
    compiler: function (code, filePath) {
        // 这里是有限制的，compiler 只会传入当前要执行的文件，如果该文件引入的另外一个文件需要转义的话，则不会被转义。
        console.log(code);
        console.log(filePath);

        let result = babel.transform(code, {
            presets: ['env', 'stage-0']
        });

        console.log(result.code);

        return result.code;
    }
});

let TARGET_PATH = path.resolve('./data/user_info/handle_modules/success_import/index.js');

fs.readFile(TARGET_PATH, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);

    let functionInSandbox = vm.run(data, TARGET_PATH);

    console.log('====result====', functionInSandbox.default());
});
