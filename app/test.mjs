import Test from './components/test.mjs';
import { Multipane, MultipaneResizer } from './dist/vue-multipane.esm.js';

window.Vue = Vue;

new Vue({
   render: h => h(Test),
  components: {
    Multipane,
    MultipaneResizer
  }
 }).$mount(`#app`);

