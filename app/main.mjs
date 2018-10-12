import App from './components/App.js';

Vue.component('my-component', {
//  template: '<p class="foo bar">Hi</p>'
  template: '<div/>'
})

// new Vue({
//   render: h => h(App),
// }).$mount(`#app`);

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

var vm = new Vue({
  el: '#example',
  data: {
    name: 'Vue.js'
  },
  // define methods under the `methods` object
  methods: {
    greet: function (event) {
      // `this` inside methods point to the Vue instance
      alert('Hello ' + this.name + '!')
      // `event` is the native DOM event
      alert(event.target.tagName)
    }
  }
})