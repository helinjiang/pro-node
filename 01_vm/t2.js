const fs = require('fs');
const path = require('path');
const vm = require('vm');
const errorNotLogin = require('./data/user_info/handle_modules/error_not_login/index.js');

console.log(errorNotLogin());

let localVar = 'initial value';

const vmResult = vm.runInThisContext('localVar = typeof require;');
console.log('vmResult:', vmResult);
console.log('localVar:', localVar);

const sandbox = {};
vm.createContext(sandbox);
const script = new vm.Script(`
    // sandbox 的 constructor 是外层的 Object 类
    // Object 类的 constructor 是外层的 Function 类
    const OutFunction = this.constructor.constructor;
    // 于是, 利用外层的 Function 构造一个函数就可以得到外层的全局 this
    const OutThis = (OutFunction('return this;'))();
    // 得到 require
    const require = OutThis.process.mainModule.require;
    // 试试
    require('fs');
`, {});

const result = script.runInContext(sandbox);
console.log(result === require('fs'));

fs.readFile(path.resolve('./data/user_info/handle_modules/error_not_login/index.js'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);

    const sandbox = {
        require: require,
        module: module
    };

    vm.createContext(sandbox);

    const script = new vm.Script(data, {});

    const result = script.runInContext(sandbox);

    console.log('====result====', result());
});