const util = require("util");

function inspect(label, value) {
    console.log(label, util.inspect(value, { depth: 50 }));
}

exports.vector = vector;
function vector(options) {
    return {
        fanOut: options && options.fanOut || 10,
        count: 0,
        root: undefined,
        levels: 0
    };
}

exports.count = count;
function count(vector) {
    return vector.count;
}

exports.push = push;
function push(vector, value) {
    //inspect("push", { vector, value });
    let retval;
    const newLevels = Math.max(1, // max to avoid the level being 0
        Math.ceil(
        Math.log(vector.count + 1) /
        Math.log(vector.fanOut))
    );
    console.log({ newLevels });
    if (vector.root && (newLevels > vector.levels)) {
        // expand new level
        //console.log("expand new level");
        const newRoot = Array(vector.fanOut);
        newRoot[0] = vector.root;
        const secondChild = _push(
            null, value, 0,
            vector.fanOut, newLevels - 2);
        newRoot[1] = secondChild;
        retval = {
            fanOut: vector.fanOut,
            count: vector.count + 1,
            root: newRoot,
            levels: newLevels
        };
    } else {
        //console.log("no expand");
        const newRoot = _push(
            vector.root, value, vector.count,
            vector.fanOut, newLevels - 1);
        retval = {
            fanOut: vector.fanOut,
            count: vector.count + 1,
            root: newRoot,
            levels: newLevels
        };
    }
    //inspect("returning from push", retval);
    return retval;
}

function _push(node, value, index, fanOut, level) {
    //inspect("_push", { node, value, index, level });
    let retval;
    const newNode = node ? node.slice() : Array(fanOut);
    const thisIndex = Math.floor(index / fanOut);
    const childIndex = index % fanOut;
    if (level === 0) {
        newNode[index] = value;
    } else {
        const newChildNode = _push(
            node && node[thisIndex], value, childIndex,
            fanOut, level - 1);
        newNode[childIndex] = newChildNode;
    }
    retval = newNode;
    //inspect("returing from _push", retval);
    return retval;
}

exports.get = get;
function get(vector, index) {
    inspect("get", { vector, index });
    if (!vector.root || index >= vector.count) {
        throw new Error("Index out of bounds");
    }
    const levels = Math.max(1,
        Math.ceil(
        // max to avoid the level being 0
        Math.log(vector.count) /
        Math.log(vector.fanOut))
    );
    return _get(vector.root, index, vector.fanOut, levels - 1);
}

exports._get = _get;
function _get(node, index, fanOut, level) {
    inspect("_get", { node, index, fanOut, level });
    let retval;
    const thisIndex = Math.floor(
        index / Math.pow(fanOut, level))
        % fanOut;
    const thisNode = node[thisIndex];
    if (level === 0) {
        // this is actually the value
        retval = thisNode;
    } else {
        retval = _get(thisNode, index, fanOut, level - 1);
    }
    inspect("returing from _get", retval);
    return retval;
}

exports.set = set;
function set(vector, index, value) {
    const newRoot = _set(vector.root, index, vector.fanOut, vector.levels);
    return {
        root: newRoot,
        fanOut: vector.fanOut,
        count: vector.count,
        levels: vector.levels
    };
}

function _set(node, index, fanOut, level) {

}
