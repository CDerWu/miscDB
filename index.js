//TODO:重新製作存放目標
const db = require('./db');

let save = async function () {
    await db.miscSave(dataTable);
}
let dataTable = {};
// let main = async function () {
//     dataTable = await db.miscLoad();
// }
// main();

exports.safeLoad = async function () {
    dataTable = await db.miscLoad();
    let a = 0;
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

