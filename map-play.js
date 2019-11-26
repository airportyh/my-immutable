const tm = require("./my-tree-map");
const yaml = require('js-yaml');
const fs = require("fs");

let map = tm.treeMap();
const history = [];
const range = 20;
for (let i = 0; i < range; i++) {
    history.push(map);
    map = tm.set(map, i, i);
}

for (let i = 0; i < range; i++) {
    const map = history[i];
    console.log("map", i);
    console.log(tm.repr(map));
}
