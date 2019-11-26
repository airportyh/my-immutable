const fs = require("mz/fs");
const { performance } = require('perf_hooks');

async function main() {
    let start, end;
    const contents = (await fs.readFile("./war-and-peace.txt")).toString();
    const words = contents.split(/[^a-zA-Z']+/);
    const map = {};
    start = performance.now();

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const count = map[word];
        if (count) {
            map[word] = count + 1;
        } else {
            map[word] = 1;
        }
    }
    end = performance.now();
    console.log("Took", end - start, "ms to tally words");
    //console.log(tm.repr(map));
}

main().catch(console.log);
