let dataTable = {};

let saveFunc = async function () { };
let loadFunc = async function () { };

exports.init.setSaveFunc = function (func) {
    saveFunc = func;
}

exports.init.setLoadFunc = function (func) {
    loadFunc = func;
}

exports.init.activate = async function () {
    dataTable = await loadFunc();
}

let save = async function () {
    await saveFunc(dataTable);
}

let clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.get = function (...param) {
    let pointer = clone(dataTable);
    for (let idx in param) {
        let key = param[idx];
        if (pointer[key]) {
            pointer = pointer[key];
        }
        else {
            return null;
        }
    }
    return pointer;
}
//TODO:解決空物件存放 空物件自動刪除
exports.set = function (...param) {
    if (param.length < 2) {
        return null;
    }
    let val = param.splice(param.length - 1)[0];

    let search = function (table) {
        if (param.length === 1) {
            let key = param[0];
            table[key] = val;
            save();
        } else {
            let key = param[0];
            param = param.splice(1);
            if (!table[key]) {
                table[key] = {};
            }
            search(table[key]);
        }
    }
    search(dataTable);
}

