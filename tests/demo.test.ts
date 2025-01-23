import { Pkl } from "../src/pkl";
import * as fs from "fs";

const pklStr = fs.readFileSync("tests/demo.pkl", "utf-8");

describe("Pkl", () => {
    it("should parse pkl string", () => {
        const pkl = new Pkl(pklStr);
        expect(pkl.get("a.b.c")).toBe(1);
        expect(pkl.get("a.b.d")).toBe("hello");
        expect(pkl.get("a.e")).toBe(true);
        expect(pkl.get("a.f")).toBe(false);
    });

    it("should stringify pkl object", () => {
        const pkl = new Pkl(pklStr);
        const pklStr2 = pkl.toString();
        const pkl2 = new Pkl(pklStr2);
        expect(pkl2.get("a.b.c")).toBe(1);
        expect(pkl2.get("a.b.d")).toBe("hello");
        expect(pkl2.get("a.e")).toBe(true);
        expect(pkl2.get("a.f")).toBe(false);
    });

    it("should convert to JSON", () => {
        const pkl = new Pkl(pklStr);
        const jsonStr = pkl.toJSON();
        const jsonObj = JSON.parse(jsonStr);
        expect(jsonObj).toEqual({
            a: {
                b: {
                    c: 1,
                    d: "hello",
                },
                e: true,
                f: false,
            },
        });
    });
});
