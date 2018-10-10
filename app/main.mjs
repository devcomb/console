var yaml_config = require('node-yaml-config');
var config = yaml_config.load('./config/menu-section-left.yml');
console.log(config); 

import App from './components/App.js';

Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})

// new Vue({
//   render: h => h(App),
// }).$mount(`#app`);

new Vue({
  el: '#app',
  data: {
    menus: [
      {
        id: 1,
        title: 'Do the dishes',
      },
      {
        id: 2,
        title: 'Take out the trash',
      },
      {
        id: 3,
        title: 'Mow the lawn'
      }
    ]
  }
})