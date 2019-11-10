const pv = require("../my-persistent-vector");
const util = require("util");

describe("my persistent vector", () => {
    it("can create empty vector", () => {
        const vec = pv.vector();
        expect(pv.count(vec)).toEqual(0);
    });

    it("can push new value", () => {
        const vec = pv.vector();
        const vec2 = pv.push(vec, "A");
        expect(pv.count(vec)).toEqual(0);
        expect(pv.count(vec2)).toEqual(1);
        expect(pv.get(vec2, 0)).toEqual("A");
    });

    it("can push new value second time", () => {
        const vec = pv.vector();
        const vec2 = pv.push(vec, "A");
        const vec3 = pv.push(vec2, "B");
        expect(pv.count(vec3)).toEqual(2);
        expect(pv.get(vec3, 0)).toEqual("A");
        expect(pv.get(vec3, 1)).toEqual("B");
    });

    it("cannot get value if index is out of bounds", () => {
        const vec = pv.vector();
        const vec2 = pv.push(vec, "A");
        expect(() => pv.get(vec2, 1)).toThrow(/Index out of bounds/);
    });

    it("expands new level if root node's capacity is exceeded", () => {
        const vec = pv.vector({ fanOut: 2 });
        const vec2 = pv.push(vec, "A");
        const vec3 = pv.push(vec2, "B");
        // the next one causes an "expand"
        const vec4 = pv.push(vec3, "C");
        expect(vec2.root).toEqual(["A", undefined]);
        expect(vec3.root).toEqual(["A", "B"]);
        expect(pv.count(vec4)).toEqual(3);
        expect(vec4.root[0]).toEqual(["A", "B"]);
        expect(vec4.root[1]).toEqual(["C", undefined]);
        expect(vec4.root[0]).toBe(vec3.root);
    });

    it("can still get after an expand", () => {
        const vec = pv.vector({ fanOut: 2 });
        const vec2 = pv.push(vec, "A");
        const vec3 = pv.push(vec2, "B");
        // the next one causes an "expand"
        const vec4 = pv.push(vec3, "C");
        expect(pv.get(vec4, 0)).toEqual("A");
        expect(pv.get(vec4, 1)).toEqual("B");
        expect(pv.get(vec4, 2)).toEqual("C");
    });

    it("expands to 3rd level and still works", () => {
        const vec = pv.vector({ fanOut: 2 });
        const vec2 = pv.push(vec, "A");
        const vec3 = pv.push(vec2, "B");
        const vec4 = pv.push(vec3, "C");
        const vec5 = pv.push(vec4, "D");
        const vec6 = pv.push(vec5, "E");
        expect(pv.count(vec6)).toEqual(5);
        expect(pv.get(vec6, 0)).toEqual("A");
        expect(pv.get(vec6, 1)).toEqual("B");
        expect(pv.get(vec6, 2)).toEqual("C");
        expect(pv.get(vec6, 3)).toEqual("D");
        expect(pv.get(vec6, 4)).toEqual("E");
    });

    // it("can set items in the middle", () => {
    //     const vec = pv.vector({ fanOut: 2 });
    //     const vec2 = pv.push(vec, "A");
    //     const vec3 = pv.push(vec2, "B");
    //     const vec4 = pv.set(vec3, 1, "X");
    //     expect(pv.get(vec4)).toEqual("X");
    // });
});
