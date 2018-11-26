import Pane from './pane.mjs';
export default Vue.component('pane-left', {
  template: `
    <pane v-bind:currentNavItem="currentNavItem"/>
  `,
  props: ['currentNavItem'],

});