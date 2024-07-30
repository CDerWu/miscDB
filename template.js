const miscDBInit = require("miscDB").init;
const fs = require("fs");

const savePlace = `${process.cwd()}/misc`;

let saveFunc = async function (obj) {
    fs.writeFileSync(savePlace, JSON.stringify(obj, null, 4));
}
miscDBInit.setSaveFunc(saveFunc);


let loadFunc = async function () {
    return JSON.parse(fs.readFileSync(savePlace));
}
miscDBInit.setLoadFunc(loadFunc);

miscDBInit.activate(); // if can, await it.