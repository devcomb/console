import Svg from './svg.mjs';
import HeaderItem from './header-item.mjs';

export default Vue.component('compHeader', {
  template: `
  <div style="user-select:none" class="h-full pt-1 pb-1 layout-h flex flex-row">
        <div
            is="header-item"
            v-for="item in info"
            v-bind:title="item.title"
            v-bind:action="item.action"
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