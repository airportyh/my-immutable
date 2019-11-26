const pv = require("./my-persistent-vector");

let vector = pv.vector();

for (let i = 0; i < 100; i++) {
    vector = pv.push(vector, i);
}

console.log(vector);

for (let i = 0; i < pv.count(vector); i++) {
    console.log(pv.get(vector, i));
}
