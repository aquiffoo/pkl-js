"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePkl = void 0;
const parsePkl = (pklStr) => {
    const lines = pklStr.trim().split('\n');
    const result = {};
    let currObj = result;
    const objStack = [];
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.endsWith('{')) {
            const key = trimmed.slice(0, -1).trim();
            const newObj = {};
            currObj[key] = newObj;
            objStack.push(currObj);
            currObj = newObj;
        }
        else if (trimmed === '}')
            currObj = objStack.pop();
        else {
            const [key, val] = trimmed.split('=').map((s) => s.trim());
            const parsedVal = parseValue(val);
            currObj[key] = parsedVal;
        }
    }
    console.log("parsed object", JSON.stringify(result, null, 2));
    return result;
};
exports.parsePkl = parsePkl;
const parseValue = (val) => {
    if (val.startsWith('"') && val.endsWith('"'))
        return val.slice(1, -1);
    if (!isNaN(Number(val)))
        return Number(val);
    if (val === 'True')
        return true;
    if (val === 'False')
        return false;
    throw new Error(`Unknown value type for ${val}`);
};
