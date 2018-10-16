import App from './components/App.js';

Vue.component('my-component', {
//  template: '<p class="foo bar">Hi</p>'
  template: '<div/>'
})

var testLayout = [
    {"x":0,"y":0,"w":2,"h":2,"i":"0"},
    {"x":0,"y":1,"w":2,"h":4,"i":"1"},
    {"x":0,"y":2,"w":2,"h":5,"i":"2"}
];

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
    name: 'Vue.js',
    layout: testLayout
  },
  // define methods under the `methods` object
  methods: {
    greet: function (event) {
        try {
            import('./components/test.mjs').then(function(response) {
                response.doStuff().then(function(result) {
                    console.log(result); // "Stuff worked!"
                    }, function(err) {
                    console.log(err); // Error: "It broke"
                })
            })
        } catch (error) {
            console.log("catch error:"+error); // Error: "It broke"
        }
        
    }
  }
})

