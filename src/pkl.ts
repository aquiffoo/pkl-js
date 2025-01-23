import { parsePkl } from "./parser";
import { isObj } from "./utils";

export class Pkl {
    private data: any;

    constructor(pklStr: string) {
        this.data = parsePkl(pklStr);
    }

    get(path: string): any {
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

    toJSON(): string {
        return JSON.stringify(this.data);
    }

    toString(): string {
        return stringifyToPkl(this.data);
    }
}

const stringifyToPkl = (data: any, indentVal: number = 0): string => {
    const indent = "  ".repeat(indentVal);
    let pklStr = "";
    
    for (const key in data) {
        const val = data[key];
        if (isObj(val)) {
            pklStr += `${indent}${key} {\n${stringifyToPkl(val, indentVal + 1)}${indent}}\n`;
        } else {
            const fmtVal = 
                typeof val === "string" ? `"${val}"` :
                typeof val === "number" ? val.toString() :
                val === true ? "True" :
                val === false ? "False" :
                val;
            pklStr += `${indent}${key} = ${fmtVal}\n`;
        }
    }
    return pklStr;
};
