const util = require("util");

const isDebugMode = true;
let stackDepth = 0;
exports.indent = indent;
function indent(str, level) {
    const indent = Array(level + 1).join("    ");
    return str.split("\n").map(line => indent + line).join("\n");
}

exports.debug = debug;
function debug(message, value) {
    if (!isDebugMode) {
        return;
    }
    if (value) {
        console.log(indent(message + " " + util.inspect(value, { depth: 50 }), stackDepth));
    } else {
        console.log(indent(message, stackDepth));
    }
}

exports.debug_call = debug_call;
function debug_call(label, value) {
    if (!isDebugMode) {
        return;
    }
    console.log(indent(
        "calling " + label + "(" + util.inspect(value, { depth: 50 }) + ")",
        stackDepth));
    stackDepth++;
}

exports.debug_return = debug_return;
function debug_return(label, value) {
    if (!isDebugMode) {
        return;
    }
    stackDepth--;
    console.log(indent(
        label + " returning " + util.inspect(value, { depth: 50 }),
        stackDepth));
}
