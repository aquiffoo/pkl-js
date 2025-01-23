"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pkl = void 0;
const parser_1 = require("./parser");
const utils_1 = require("./utils");
class Pkl {
    constructor(pklStr) {
        this.data = (0, parser_1.parsePkl)(pklStr);
    }
    get(path) {
        const parts = path.split('.');
        let current = this.data;
        for (const part of parts) {
            if (current === undefined || current === null) {
                return undefined;
            }
            current = current[part];
        }
        return current;
    }
    toJSON() {
        return JSON.stringify(this.data);
    }
    toString() {
        return stringifyToPkl(this.data);
    }
}
exports.Pkl = Pkl;
const stringifyToPkl = (data, indentVal = 0) => {
    const indent = "  ".repeat(indentVal);
    let pklStr = "";
    for (const key in data) {
        const val = data[key];
        if ((0, utils_1.isObj)(val)) {
            pklStr += `${indent}${key} {\n${stringifyToPkl(val, indentVal + 1)}${indent}}\n`;
        }
        else {
            const fmtVal = typeof val === "string" ? `"${val}"` :
                typeof val === "number" ? val.toString() :
                    val === true ? "True" :
                        val === false ? "False" :
                            val;
            pklStr += `${indent}${key} = ${fmtVal}\n`;
        }
    }
    return pklStr;
};
