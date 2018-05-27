const fs = require('fs');
const path = require('path');
const babel = require('babel-core');

const { NodeVM } = require('vm2');

// 如果引入了外部模块，则不能够设置 require.root 属性，否则将会提示没有权限引入
// VMError: Module 'mockjs' is not allowed to be required. The path is outside the border!
// 可以通过控制 external 来限制哪些外部包可以被引用
const vm = new NodeVM({
    sandbox: {},
    require: {
        external: true,
        builtin: ['fs', 'path']
        // root: __dirname
    },
    compiler: function (code, filePath) {
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
