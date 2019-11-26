const tm = require("./my-tree-map");

describe("tree map", () => {
    it("can create", () => {
        const treeMap = tm.treeMap();
        expect(tm.count(treeMap)).toEqual(0);
    });

    it("can set", () => {
        const treeMap = tm.treeMap();
        const treeMap2 = tm.set(treeMap, "score", 4);
        expect(tm.count(treeMap2)).toEqual(1);
    });

    it("can get after set", () => {
        const treeMap = tm.treeMap();
        const treeMap2 = tm.set(treeMap, "score", 4);
        expect(tm.get(treeMap, "score")).toEqual(undefined);
        expect(tm.get(treeMap2, "score")).toEqual(4);
    });

    it("can set again", () => {
        const treeMap = tm.treeMap();
        const treeMap2 = tm.set(treeMap, "score", 4);
        const treeMap3 = tm.set(treeMap2, "color", "red");
        const treeMap4 = tm.set(treeMap3, "energy", 45);
        expect(tm.count(treeMap3)).toEqual(2);
        expect(tm.get(treeMap3, "score")).toEqual(4);
        expect(tm.get(treeMap3, "color")).toEqual("red");
        expect(tm.get(treeMap4, "energy")).toEqual(45);
        console.log(tm.repr(treeMap4));
    });

    // it("can repr", () => {
    //     let treeMap = tm.treeMap();
    //     treeMap = tm.set(treeMap, 6, true);
    //     treeMap = tm.set(treeMap, 2, true);
    //     treeMap = tm.set(treeMap, 1, true);
    //     treeMap = tm.set(treeMap, 4, true);
    //     treeMap = tm.set(treeMap, 8, true);
    //     treeMap = tm.set(treeMap, 7, true);
    //     treeMap = tm.set(treeMap, 9, true);
    //     console.log(tm.repr(treeMap));
    // });

    it("can remove leaves", () => {
        let treeMap = tm.treeMap();
        treeMap = tm.set(treeMap, 6, true);
        treeMap = tm.set(treeMap, 2, true);
        treeMap = tm.set(treeMap, 1, true);
        treeMap = tm.set(treeMap, 4, true);
        treeMap = tm.set(treeMap, 8, true);
        treeMap = tm.set(treeMap, 7, true);
        treeMap = tm.set(treeMap, 9, true);
        //console.log("before\n" + tm.repr(treeMap));
        treeMap = tm.remove(treeMap, 7);
        treeMap = tm.remove(treeMap, 4);
        //console.log("after\n" + tm.repr(treeMap));
        expect(tm.count(treeMap)).toEqual(5);
        expect(tm.get(treeMap, 7)).toEqual(undefined);
        expect(tm.get(treeMap, 4)).toEqual(undefined);
    });

    it("can remove internal nodes", () => {
        let treeMap = tm.treeMap();
        treeMap = tm.set(treeMap, 6, true);
        treeMap = tm.set(treeMap, 2, true);
        treeMap = tm.set(treeMap, 1, true);
        treeMap = tm.set(treeMap, 4, true);
        treeMap = tm.set(treeMap, 8, true);
        treeMap = tm.set(treeMap, 7, true);
        treeMap = tm.set(treeMap, 9, true);
        // console.log("before\n" + tm.repr(treeMap));
        treeMap = tm.remove(treeMap, 6);
        // console.log("after\n" + tm.repr(treeMap));
        expect(tm.count(treeMap)).toEqual(6);
        expect(tm.get(treeMap, 6)).toEqual(undefined);
    });

    // it("can do single left rotation", () => {
    //     let treeMap = tm.treeMap();
    //     treeMap = tm.set(treeMap, 5, true);
    //     treeMap = tm.set(treeMap, 3, true);
    //     treeMap = tm.set(treeMap, 7, true);
    //     treeMap = tm.set(treeMap, 6, true);
    //     treeMap = tm.set(treeMap, 8, true);
    //     // console.log("before\n" + tm.repr(treeMap));
    //     treeMap = tm.singleLeftRotation(treeMap);
    //     // console.log("after\n" + tm.repr(treeMap));
    // });

    // it("can do single right rotation", () => {
    //     let treeMap = tm.treeMap();
    //     treeMap = tm.set(treeMap, 5, true);
    //     treeMap = tm.set(treeMap, 2, true);
    //     treeMap = tm.set(treeMap, 7, true);
    //     treeMap = tm.set(treeMap, 1, true);
    //     treeMap = tm.set(treeMap, 3, true);
    //     // console.log("before\n" + tm.repr(treeMap));
    //     treeMap = tm.singleRightRotation(treeMap);
    //     // console.log("after\n" + tm.repr(treeMap));
    // });

    // it("can do double left rotation", () => {
    //     let treeMap = tm.treeMap();
    //     treeMap = tm.set(treeMap, 5, true);
    //     treeMap = tm.set(treeMap, 3, true);
    //     treeMap = tm.set(treeMap, 9, true);
    //     treeMap = tm.set(treeMap, 7, true);
    //     treeMap = tm.set(treeMap, 6, true);
    //     treeMap = tm.set(treeMap, 8, true);
    //     treeMap = tm.set(treeMap, 10, true);
    //     console.log("before\n" + tm.repr(treeMap));
    //     treeMap = tm.doubleLeftRotation(treeMap);
    //     console.log("after\n" + tm.repr(treeMap));
    // });

    // it("can do double right rotation", () => {
    //     let treeMap = tm.treeMap();
    //     treeMap = tm.set(treeMap, 6, true);
    //     treeMap = tm.set(treeMap, 2, true);
    //     treeMap = tm.set(treeMap, 1, true);
    //     treeMap = tm.set(treeMap, 4, true);
    //     treeMap = tm.set(treeMap, 3, true);
    //     treeMap = tm.set(treeMap, 5, true);
    //     treeMap = tm.set(treeMap, 8, true);
    //     console.log("before\n" + tm.repr(treeMap));
    //     treeMap = tm.doubleRightRotation(treeMap);
    //     console.log("after\n" + tm.repr(treeMap));
    // });

    it("can balance trees", () => {
        let treeMap = tm.treeMap();
        treeMap = tm.set(treeMap, 1, true);
        treeMap = tm.set(treeMap, 2, true);
        treeMap = tm.set(treeMap, 3, true);
        treeMap = tm.set(treeMap, 4, true);
        treeMap = tm.set(treeMap, 5, true);
        // console.log("before\n" + tm.repr(treeMap));
        treeMap = tm.balanced(treeMap);
        // console.log("after\n" + tm.repr(treeMap));
    });

    it("can balance trees (2)", () => {
        let treeMap = tm.treeMap();
        treeMap = tm.set(treeMap, 5, true);
        treeMap = tm.set(treeMap, 4, true);
        treeMap = tm.set(treeMap, 3, true);
        treeMap = tm.set(treeMap, 2, true);
        treeMap = tm.set(treeMap, 1, true);
        // console.log("before\n" + tm.repr(treeMap));
        treeMap = tm.balanced(treeMap);
        // console.log("after\n" + tm.repr(treeMap));
    });

    it("can balance trees (3)", () => {
        let treeMap = tm.treeMap();
        treeMap = tm.set(treeMap, 5, true);
        treeMap = tm.set(treeMap, 1, true);
        treeMap = tm.set(treeMap, 9, true);
        treeMap = tm.set(treeMap, 6, true);
        treeMap = tm.set(treeMap, 7, true);
        treeMap = tm.set(treeMap, 8, true);
        treeMap = tm.set(treeMap, 10, true);
        // console.log("before\n" + tm.repr(treeMap));
        treeMap = tm.balanced(treeMap);
        // console.log("after\n" + tm.repr(treeMap));
    });

    it("can traverse with each", () => {
        let treeMap = tm.treeMap();
        treeMap = tm.set(treeMap, 5, true);
        treeMap = tm.set(treeMap, 1, true);
        treeMap = tm.set(treeMap, 9, true);
        treeMap = tm.set(treeMap, 6, true);
        treeMap = tm.set(treeMap, 7, true);
        treeMap = tm.set(treeMap, 8, true);
        treeMap = tm.set(treeMap, 10, true);
        const entries = [];
        tm.each(treeMap, (value, key) => {
            entries.push([key, value]);
        });
        expect(entries).toEqual([
            [1, true],
            [5, true],
            [6, true],
            [7, true],
            [8, true],
            [9, true],
            [10, true]
        ]);
    });
});
