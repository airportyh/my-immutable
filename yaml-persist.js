const pv = require("./my-persistent-vector");
const yaml = require('js-yaml');
const fs = require("fs");

let vec = pv.vector();

const history = [vec];

for (let i = 0; i < 1000; i++) {
    vec = pv.push(vec, (i + 1));
    history.push(vec);
}

fs.writeFile("data.yml", yaml.safeDump(history), (err) => {
    console.log("Done.");
});
