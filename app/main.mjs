import App from './components/App.js';
import Test from './components/test.mjs';
import { Multipane, MultipaneResizer } from './dist/vue-multipane.esm.js';


new Vue({
  el: '#app',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('https://nodejs-theia-nginx-test8.cloudapps.devcomb.com/api/getSideNavMenus')
      .then(response => (this.info = response.data.menus ));
  },
  methods: {
    greet: function (event) {
      // `this` inside methods point to the Vue instance
      alert('Hello ' + this.name + '!')
      // `event` is the native DOM event
      alert(event.target.tagName)
    }
  }
})

new Vue({
   render: h => h(Test),
  components: {
    Multipane,
    MultipaneResizer
  }
 }).$mount(`#example`);

