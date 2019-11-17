const zip = require("lodash/zip");
const { debug_call, debug_return, debug } = require("./my-debug");

exports.treeMap = treeMap;
function treeMap() {
    return null;
}

exports.makeTreeMapNode = makeTreeMapNode;
function makeTreeMapNode(key, value, left, right) {
    return {
        key,
        value,
        left,
        right,
        count: count(left) + count(right) + 1
    };
}

exports.repr = repr;
function repr(treeMap) {
    const lines = _repr(treeMap);
    return lines.join("\n");
}

exports._repr = _repr;
function _repr(treeMap) {
    debug_call("_repr", { treeMap });
    if (!treeMap) {
        let retval = [];
        debug_return("_repr", retval);
        return retval;
    }
    const leftLines = _repr(treeMap.left);
    const rightLines = _repr(treeMap.right);
    const maxLeftLineLength = leftLines
        .reduce((max, line) =>
            line.length > max ? line.length : max, 0);
    const indent = Array(maxLeftLineLength + 1).join(" ");
    const thisDisplay = `(${treeMap.key}:${treeMap.value})`;
    const thisLine = indent + thisDisplay;
    const childLines = zip(leftLines, rightLines)
        .map(([leftLine, rightLine]) => {
            if (!rightLine) {
                return leftLine;
            }
            if (!leftLine) {
                const thisDisplayLength = Array(thisDisplay.length + 1).join(" ");
                const paddingForLeftSide = Array(maxLeftLineLength + 1).join(" ");
                return paddingForLeftSide + thisDisplayLength + rightLine;
            } else {
                const thisDisplayLength = Array(thisDisplay.length + 1).join(" ");
                const paddingForLeftSide = Array(maxLeftLineLength - leftLine.length + 1).join(" ");
                return leftLine + paddingForLeftSide + thisDisplayLength + rightLine;
            }
        });
    const allMyLines = [thisLine, ...childLines];
    debug_return("_repr", allMyLines);
    return allMyLines;
}

exports.count = count;
function count(treeMap) {
    return treeMap && treeMap.count || 0;
}

exports.set = set;
function set(treeMap, key, value) {
    if (treeMap === null) {
        return {
            key: key,
            value: value,
            count: 1,
            left: null,
            right: null
        };
    } else {
        if (key > treeMap.key) {
            return balanced(makeTreeMapNode(
                treeMap.key,
                treeMap.value,
                treeMap.left,
                set(treeMap.right, key, value)
            ));
        } else if (key < treeMap.key) {
            return balanced(makeTreeMapNode(
                treeMap.key,
                treeMap.value,
                set(treeMap.left, key, value),
                treeMap.right
            ));
        } else {
            throw new Error("Unsupported");
        }
    }
}

exports.get = get;
function get(treeMap, key) {
    if (!treeMap) {
        return undefined;
    }
    if (treeMap.key === key) {
        return treeMap.value;
    } else if (key > treeMap.key) {
        return get(treeMap.right, key);
    } else {
        return get(treeMap.left, key);
    }
}

exports.remove = remove;
function remove(treeMap, key) {
    if (!treeMap) {
        return treeMap;
    }
    if (key > treeMap.key) {
        const newRight = remove(treeMap.right, key);
        return balanced(makeTreeMapNode(
            treeMap.key,
            treeMap.value,
            treeMap.left,
            newRight
        ));
    } else if (key < treeMap.key) {
        const newLeft = remove(treeMap.left, key);
        return balanced(makeTreeMapNode(
            treeMap.key,
            treeMap.value,
            newLeft,
            treeMap.right
        ));
    } else {
        if (!treeMap.right && !treeMap.left) {
            return null;
        }
        if (!treeMap.right) {
            return treeMap.left;
        }
        if (!treeMap.left) {
            return treeMap.right;
        }
        const min = minNode(treeMap.right);
        const newTreeMap = balanced(makeTreeMapNode(
            min.key,
            min.value,
            treeMap.left,
            remove(treeMap.right, min.key)
        ));
        return newTreeMap;
    }
    return treeMap;
}

exports.minNode = minNode;
function minNode(treeMap) {
    if (treeMap.left) {
        return minNode(treeMap.left);
    } else {
        return treeMap;
    }
}

exports.balanced = balanced;
function balanced(treeMap) {
    debug_call("balanced", { treeMap });
    const weight = 2.5;
    const leftCount = count(treeMap.left);
    const rightCount = count(treeMap.right);
    if (leftCount + rightCount < 2) {
        debug("leftCount + rightCount < 2");
        return treeMap;
    } else if (rightCount > weight * leftCount) { // right too big
        debug("right too big");
        const rightLeftCount = count(treeMap.right.left);
        const rightRightCount = count(treeMap.right.right);
        if (rightLeftCount < rightRightCount) {
            let retval = singleLeftRotation(treeMap);
            debug_return("balanced", retval);
            return retval;
        } else {
            let retval = doubleLeftRotation(treeMap);
            debug_return("balanced", retval);
            return retval;
        }
    } else if (leftCount > weight * rightCount) { // left too big
        debug("left too big");
        const leftLeftCount = count(treeMap.left.left);
        const leftRightCount = count(treeMap.left.right);
        if (leftRightCount < leftLeftCount) {
            let retval = singleRightRotation(treeMap);
            debug_return("balanced", retval);
            return retval;
        } else {
            let retval = doubleRightRotation(treeMap);
            debug_return("balanced", retval);
            return retval;
        }
    } else {
        debug("else");
        debug_return("balanced", treeMap);
        return treeMap;
    }
    debug_return("balanced", treeMap);
    return treeMap;
}

exports.singleLeftRotation = singleLeftRotation;
function singleLeftRotation(treeMap) {
    debug_call("singleLeftRotation", { treeMap });
    const newLeft = makeTreeMapNode(
        treeMap.key,
        treeMap.value,
        treeMap.left,
        treeMap.right.left
    );
    debug("newLeft", newLeft);
    const newRight = treeMap.right.right;
    debug("newRight", newRight);
    const newTreeMap = makeTreeMapNode(
        treeMap.right.key,
        treeMap.right.value,
        newLeft,
        newRight
    );
    debug_return("singleLeftRotation", newTreeMap);
    return newTreeMap;
}

exports.doubleLeftRotation = doubleLeftRotation;
function doubleLeftRotation(treeMap) {
    debug_call("doubleLeftRotation", { treeMap });
    const newLeft = makeTreeMapNode(
        treeMap.key,
        treeMap.value,
        treeMap.left,
        treeMap.right.left.left
    );
    debug("newLeft", newLeft);
    const newRight = makeTreeMapNode(
        treeMap.right.key,
        treeMap.right.value,
        treeMap.right.left.right,
        treeMap.right.right
    );
    debug("newRight", newRight);
    const retval = makeTreeMapNode(
        treeMap.right.left.key,
        treeMap.right.left.value,
        newLeft,
        newRight
    );
    debug_return("doubleLeftRotation", retval);
    return retval;
}

exports.singleRightRotation = singleRightRotation;
function singleRightRotation(treeMap) {
    debug_call("singleRightRotation", { treeMap });
    const newRight = makeTreeMapNode(
        treeMap.key,
        treeMap.value,
        treeMap.right,
        treeMap.left.right
    );
    debug("newRight", newRight);
    const newLeft = treeMap.left.left;
    debug("newLeft", newLeft);
    const newTreeMap = makeTreeMapNode(
        treeMap.left.key,
        treeMap.left.value,
        newLeft,
        newRight
    );
    debug_return("singleRightRotation", newTreeMap);
    return newTreeMap;
}

exports.doubleRightRotation = doubleRightRotation;
function doubleRightRotation(treeMap) {
    debug_call("doubleRightRotation", { treeMap });
    const newRight = makeTreeMapNode(
        treeMap.key,
        treeMap.value,
        treeMap.left.right.right,
        treeMap.right
    );
    debug("newRight", newRight);
    const newLeft = makeTreeMapNode(
        treeMap.left.key,
        treeMap.left.value,
        treeMap.left.left,
        treeMap.left.right.left
    );
    debug("newRight", newRight);
    const retval = makeTreeMapNode(
        treeMap.left.right.key,
        treeMap.left.right.value,
        newLeft,
        newRight
    );
    debug_return("doubleRightRotation", retval);
    return retval;
}
