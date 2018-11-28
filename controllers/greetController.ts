//Sample exegesis typescript example
//Generates greetController.js
//with ../node_modules/.bin/tsc greetController.ts

//This can be used to create API interfaces with
//Theia extensions or plugins.
import { ExegesisContext } from 'exegesis';

// ./node_modules/.bin/tsc controllers/greetController.ts

export function greetGet(context: ExegesisContext) {
    const {name} = context.params.query;
    return {greeting: `Hello, ${name}!`};
}