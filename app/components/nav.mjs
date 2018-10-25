import App from './nav-items.js';
export default Vue.component('nav-bar', {
  template: `
    <div class="pt-2" style="user-select:none;width:1.5em">
        <div
            is="nav-item"
            v-for="nav in info"
            v-bind:isLeft="isLeft"
            v-on:actionEvent=actionEvent
            v-bind:title="nav.title"
            v-bind:action="nav.action"
            v-bind:currentItem="currentItem"
        ></div>
    </div>
  `,
  props: ['apiURL','currentItem','isLeft'],
  data: function () {
    return { 
        info: null
        
    };
  },
  methods: {
    actionEvent: function (action) {        
        this.$emit('actionEvent', action);
    }
  },
  mounted: function () {
    axios
      .get(this.apiURL)
      .then(response => (this.info = response.data.menus ));
  }
});