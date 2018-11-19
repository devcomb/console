const util = require('util')

exports.getGreeting = function getGreeting(context) {
    const name = context.params.query.name;    
    console.log(util.inspect(context.params.query, false, null, true /* enable colors */))
    // console.log(util.inspect(context, false, null, true /* enable colors */))
    return {message: `Hello ${name}`};
}