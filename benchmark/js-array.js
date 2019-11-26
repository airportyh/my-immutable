const { performance } = require('perf_hooks');

const times = [];

// for (let iterations = 1; iterations < 162; iterations++) {
//     const arr = [];
//     const start = performance.now();
//     for (let i = 0; i < iterations; i++) {
//         arr.push(i);
//     }
//     const end = performance.now();
//     times.push(end - start);
// }

console.log("iterations\tmilliseconds");
for (let i = 0; i < times.length; i++) {
    console.log(i + "\t" + times[i]);
}
