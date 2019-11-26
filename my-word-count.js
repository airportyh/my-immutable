const fs = require("mz/fs");
const tm = require("./my-tree-map");
const pv = require("./my-persistent-vector");
const { performance } = require('perf_hooks');

async function main() {
    let start, end;
    const contents = (await fs.readFile("./array.txt")).toString();
    const words = contents.split(/[^a-zA-Z']+/);
    let vector = pv.vector();
    let map = tm.treeMap();

    start = performance.now();
    words.forEach((word) => {
        vector = pv.push(vector, word);
    });
    end = performance.now();
    console.log("Took", end - start, "ms to initialize vector");

    start = performance.now();
    for (let i = 0; i < pv.count(vector); i++) {
        const word = pv.get(vector, i);
        const count = tm.get(map, word);
        if (count) {
            map = tm.set(map, word, count + 1);
        } else {
            map = tm.set(map, word, 1);
        }
    }
    end = performance.now();
    console.log("Took", end - start, "ms to tally words");
    // console.log(tm.repr(map));
}

main().catch(console.log);
