"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObj = exports.isNumber = exports.isString = void 0;
const isString = (val) => {
    return typeof val === "string";
};
exports.isString = isString;
const isNumber = (val) => {
    return typeof val === "number";
};
exports.isNumber = isNumber;
const isObj = (val) => {
    return typeof val === "object" && val !== null && !Array.isArray(val);
};
exports.isObj = isObj;
