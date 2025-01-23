export const isString = (val: any): val is string => {
    return typeof val === "string";
}

export const isNumber = (val: any): val is number => {
    return typeof val === "number";
}

export const isObj = (val: any): val is Record<string, any> => {
    return typeof val === "object" && val !== null && !Array.isArray(val);
}
