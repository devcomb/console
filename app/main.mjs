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
  }
})