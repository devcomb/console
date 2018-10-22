import App from './nav-items.js';
export default Vue.component('nav-bar', {
  template: `
    <div class="mr-3" style="user-select:none;width:1em">
        <div
            is="menu-item"
            v-for="menu in info"
            v-bind:title="menu.title"
            v-bind:action="menu.action"
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