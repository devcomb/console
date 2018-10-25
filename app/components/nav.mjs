import App from './nav-items.js';
export default Vue.component('nav-bar', {
  template: `
    <div class="ml-1 pt-2" style="user-select:none;width:1.5em">
        <div
            is="nav-item"
            v-for="nav in info"
            v-bind:title="nav.title"
            v-bind:action="nav.action"
            style="writing-mode: vertical-lr;transform: rotate(-180deg);"
        ></div>
    </div>
  `,
  props: ['title','action'],
  data: function () {
    return { 
        info: null
    };
  },
  mounted: function () {
    axios
      .get('https://nodejs-theia-nginx-test8.cloudapps.devcomb.com/api/getSideNavMenus')
      .then(response => (this.info = response.data.menus ));
  }
});