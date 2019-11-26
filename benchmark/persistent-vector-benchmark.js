const inspector = require('inspector');
const pv = require("../my-persistent-vector");
const { performance } = require('perf_hooks');
const util = require("util");
const mori = require("mori");
const fs = require("fs");
const immutable = require("immutable");
const session = new inspector.Session();
session.connect();

// session.post('Profiler.enable', () => {
//     session.post('Profiler.start', () => {
        runBenchmarks();
//         session.post('Profiler.stop', (err, { profile }) => {
//             if (!err) {
//                 fs.writeFileSync('./profile.cpuprofile', JSON.stringify(profile));
//             }
//         });
//     });
// });

function runBenchmarks() {
    appendBenchmark();
    randomAccessBenchmark();
}

function randomAccessBenchmark() {
    let start, end;
    const iterations = 1000000;
    const arraySize = 100000;
    const indices = [];
    let vector = pv.vector();
    let arr = [];
    let moriVector = mori.vector();
    let immutableList = immutable.List();
    for (let i = 0; i < arraySize; i++) {
        vector = pv.push(vector, i);
        arr.push(i);
        moriVector = mori.conj(moriVector, i);
        immutableList = immutableList.push(i);
    }
    for (let i = 0; i < iterations; i++) {
        const index = Math.floor(Math.random() * arraySize);
        indices.push(index);
    }
    console.log("benchmark for accessing " + iterations + " elements");

    start = performance.now();
    for (let i = 0; i < iterations; i++) {
        const value = pv.get(vector, indices[i]);
    }
    end = performance.now();
    console.log("my persistent vector took", (end - start).toFixed(0) + "ms",
        "equates", (iterations / (end - start)).toFixed(0), "K ops/sec");

    start = performance.now();
    for (let i = 0; i < iterations; i++) {
        const value = arr[indices[i]];
    }
    end = performance.now();
    console.log("array took", (end - start).toFixed(0) + "ms",
        "equates", (iterations / (end - start)).toFixed(0), "K ops/sec");

    start = performance.now();
    for (let i = 0; i < iterations; i++) {
        const value = mori.get(moriVector, indices[i]);
    }
    end = performance.now();
    console.log("mori vector took", (end - start).toFixed(0) + "ms",
        "equates", (iterations / (end - start)).toFixed(0), "K ops/sec");

    start = performance.now();
    for (let i = 0; i < iterations; i++) {
        const value = immutableList.get(indices[i]);
    }
    end = performance.now();
    console.log("immutable.List took", (end - start).toFixed(0) + "ms",
        "equates", (iterations / (end - start)).toFixed(0), "K ops/sec");
}

function appendBenchmark() {
    const iterations = 1000000;
    let start, end;
    console.log("benchmark for pushing " + iterations + " elements");
    let vector = pv.vector();
    start = performance.now();
    for (let i = 0; i < iterations; i++) {
        vector = pv.push(vector, i);
    }
    end = performance.now();
    console.log("my persistent vector took", (end - start).toFixed(0) + "ms",
        "equates", (iterations / (end - start)).toFixed(0), "K ops/sec");

    let arr = [];
    start = performance.now();
    for (let i = 0; i < iterations; i++) {
        arr.push(i);
    }
    end = performance.now();
    console.log("array took", (end - start).toFixed(0) + "ms",
        "equates", (iterations / (end - start)).toFixed(0), "K ops/sec");

    // arr = [];
    // start = performance.now();
    // for (let i = 0; i < iterations; i++) {
    //     arr = [...arr, i];
    // }
    // end = performance.now();
    // console.log("cloned array took", (end - start).toFixed(0) + "ms",
    //     "equates", (iterations / (end - start)).toFixed(0), "K ops/sec");

    let moriVector = mori.vector();
    start = performance.now();
    for (let i = 0; i < iterations; i++) {
        moriVector = mori.conj(moriVector, i);
    }
    end = performance.now();
    console.log("mori vector took", (end - start).toFixed(0) + "ms",
        "equates", (iterations / (end - start)).toFixed(0), "K ops/sec");

    let immutableList = immutable.List();
    start = performance.now();
    for (let i = 0; i < iterations; i++) {
        immutableList = immutableList.push(i);
    }
    end = performance.now();
    console.log("immutable.List took", (end - start).toFixed(0) + "ms",
        "equates", (iterations / (end - start)).toFixed(0), "K ops/sec");
}
