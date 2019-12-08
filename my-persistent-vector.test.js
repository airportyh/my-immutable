const pv = require("./my-persistent-vector");
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
        expect(vec2.root).toEqual(["A", null]);
        expect(vec3.root).toEqual(["A", "B"]);
        expect(pv.count(vec4)).toEqual(3);
        expect(vec4.root[0]).toEqual(["A", "B"]);
        expect(vec4.root[1]).toEqual(["C", null]);
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

    it("can set items in the middle", () => {
        const vec = pv.vector({ fanOut: 2 });
        const vec2 = pv.push(vec, "A");
        const vec3 = pv.push(vec2, "B");
        const vec4 = pv.set(vec3, 1, "X");
        expect(pv.get(vec4, 1)).toEqual("X");
    });

    it("can set items in the middle (2)", () => {
        const vec = pv.vector({ fanOut: 2 });
        const vec2 = pv.push(vec, "A");
        const vec3 = pv.push(vec2, "B");
        const vec4 = pv.push(vec3, "C");
        const vec5 = pv.push(vec4, "D");
        const vec6 = pv.push(vec5, "E");
        const vec7 = pv.set(vec6, 3, "X");
        expect(pv.get(vec7, 3)).toEqual("X");
    });

    it("can remove", () => {
        const vec = pv.vector({ fanOut: 2 });
        const vec2 = pv.push(vec, "A");
        const vec3 = pv.push(vec2, "B");
        const vec4 = pv.pop(vec3);
        expect(pv.count(vec4)).toEqual(1);
        expect(pv.get(vec4, 0)).toEqual("A");
        expect(() => pv.get(vec4, 1)).toThrow(/Index out of bounds/);
    });

    it("can remove (2)", () => {
        const vec = pv.vector({ fanOut: 2 });
        const vec2 = pv.push(vec, "A");
        const vec3 = pv.push(vec2, "B");
        const vec4 = pv.push(vec3, "C");
        const vec5 = pv.push(vec4, "D");
        const vec6 = pv.push(vec5, "E");
        const vec7 = pv.pop(vec6);
        expect(pv.count(vec7)).toEqual(4);
        expect(pv.get(vec7, 0)).toEqual("A");
        expect(pv.get(vec7, 1)).toEqual("B");
        expect(pv.get(vec7, 2)).toEqual("C");
        expect(pv.get(vec7, 3)).toEqual("D");
        expect(() => pv.get(vec7, 4)).toThrow(/Index out of bounds/);
    });

	it("can traverse with each", () => {
		const vec = pv.vector({ fanOut: 2 });
    const vec2 = pv.push(vec, "A");
    const vec3 = pv.push(vec2, "B");
    const vec4 = pv.push(vec3, "C");
    const vec5 = pv.push(vec4, "D");
    const vec6 = pv.push(vec5, "E");
		const items = [];
		pv.each(vec6, (value, idx) => {
			items.push([idx, value]);
		});
    expect(items).toEqual([
			[0, "A"],
			[1, "B"],
			[2, "C"],
			[3, "D"],
			[4, "E"],
		]);
	});

  it("can traverse with each", () => {
    const collect = (vector) => {
      const retval = [];
      pv.each(vector, (item, idx) => retval.push([idx, item]));
      return retval;
    }
    const vec = pv.vector({ fanOut: 2 });
    const vec2 = pv.push(vec, "A");
    const vec3 = pv.push(vec2, "B");
    const vec4 = pv.push(vec3, "C");
    const vec5 = pv.push(vec4, "D");
    const vec6 = pv.push(vec5, "E");
    const vec7 = pv.push(vec6, "F");
    const vec8 = pv.push(vec7, "G");
    const vec9 = pv.push(vec8, "H");
    const vec10 = pv.push(vec9, "I");
    const vec11 = pv.push(vec10, "J");
    const vec12 = pv.push(vec11, "K");
    expect(collect(vec)).toEqual([]);
    expect(collect(vec2)).toEqual([
      [ 0, 'A' ]]);
    expect(collect(vec3)).toEqual([
      [ 0, 'A' ],
      [ 1, 'B' ]]);
    expect(collect(vec4)).toEqual([
      [ 0, 'A' ],
      [ 1, 'B' ],
      [ 2, 'C' ]]);
    expect(collect(vec5)).toEqual([
      [ 0, 'A' ],
      [ 1, 'B' ],
      [ 2, 'C' ],
      [ 3, 'D' ]]);
    expect(collect(vec6)).toEqual([
      [ 0, 'A' ],
      [ 1, 'B' ],
      [ 2, 'C' ],
      [ 3, 'D' ],
      [ 4, 'E' ]]);
    expect(collect(vec7)).toEqual([
      [ 0, 'A' ],
      [ 1, 'B' ],
      [ 2, 'C' ],
      [ 3, 'D' ],
      [ 4, 'E' ],
      [ 5, 'F' ]]);
    expect(collect(vec8)).toEqual([
      [ 0, 'A' ],
      [ 1, 'B' ],
      [ 2, 'C' ],
      [ 3, 'D' ],
      [ 4, 'E' ],
      [ 5, 'F' ],
      [ 6, 'G' ]]);
    expect(collect(vec9)).toEqual([
      [ 0, 'A' ],
      [ 1, 'B' ],
      [ 2, 'C' ],
      [ 3, 'D' ],
      [ 4, 'E' ],
      [ 5, 'F' ],
      [ 6, 'G' ],
      [ 7, 'H' ]]);
    expect(collect(vec10)).toEqual([
      [ 0, 'A' ],
      [ 1, 'B' ],
      [ 2, 'C' ],
      [ 3, 'D' ],
      [ 4, 'E' ],
      [ 5, 'F' ],
      [ 6, 'G' ],
      [ 7, 'H' ],
      [ 8, 'I' ],]);
    expect(collect(vec11)).toEqual([
      [ 0, 'A' ],
      [ 1, 'B' ],
      [ 2, 'C' ],
      [ 3, 'D' ],
      [ 4, 'E' ],
      [ 5, 'F' ],
      [ 6, 'G' ],
      [ 7, 'H' ],
      [ 8, 'I' ],
      [ 9, 'J' ]]);
    expect(collect(vec12)).toEqual([
      [ 0, 'A' ],
      [ 1, 'B' ],
      [ 2, 'C' ],
      [ 3, 'D' ],
      [ 4, 'E' ],
      [ 5, 'F' ],
      [ 6, 'G' ],
      [ 7, 'H' ],
      [ 8, 'I' ],
      [ 9, 'J' ],
      [ 10, 'K' ] ]);
  });

  it("can reduce", () => {
    let vec = pv.vector({ fanOut : 2 });
    vec = pv.push(vec, 1);
    vec = pv.push(vec, 2);
    vec = pv.push(vec, 3);
    vec = pv.push(vec, 4);
    vec = pv.push(vec, 5);
    const result = pv.reduce(vec, (curr, item, idx) => {
      return {
        ...curr,
        [idx]: item
      };
    }, {});
    expect(result).toEqual({
      0: 1,
      1: 2,
      2: 3,
      3: 4,
      4: 5
    });
  });
});
