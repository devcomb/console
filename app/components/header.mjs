import Svg from './svg.mjs';
import HeaderItem from './header-item.mjs';

export default Vue.component('compHeader', {
  template: `
  <div style="user-select:none" 
   class="h-full pl-6  layout-h flex flex-row">
        <div
            is="header-item"
            v-for="item in info"
            v-bind:title="item.title"
            v-bind:action="item.action"
        ></div>
 </div>
  `,
  data: function () {
    return { 
        info: null
    };
  },
  mounted: function () {
    axios
      .get('https://nodejs-theia-nginx-test8.cloudapps.devcomb.com/api/getHeaderMenus')
      .then(response => (this.info = response.data.menus ));
  }
});