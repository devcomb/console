"use strict";
exports.__esModule = true;
function greetGet(context) {
    var name = context.params.query.name;
    return { greeting: "Hello, " + name + "!" };
}
exports.greetGet = greetGet;
