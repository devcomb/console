export default Vue.component('nav-item', {
  template: `
  <div
      v-bind:class="{ 'bg-pane': this.isActive, 'rounded-r-lg': this.isLeft, 'rounded-l-lg': !this.isLeft}"
      v-on:click="actions"
      class="text-white text-left hover:bg-blue-dark mt-1 pl-1 pt-1 pb-1"
            style="width: 1.5em; writing-mode: vertical-lr;transform: rotate(-180deg);"
  >{{ title }}</div>
  `,
  props: ['title','action','currentItem','isLeft'],
  data: function () {
    return { 
        msg: 'hello',
        object:  [
        ]
    };
  },
  // define methods under the `methods` object
  methods: {
    actions: function (event) {
      this.$emit('actionEvent', this.action);
    }
  },
  computed:{
    isActive: function() {
        return this.currentItem === this.action;
    },
    isInactive: function() {
        if(this.currentItem==="none" || this.currentItem === this.action){
            return false;
        }
        return true;
    },
    findFunction: function() {
        var act = this.action;
        var obj = this.object.filter(function(item) {
            return item.name === act;
        });
        if(obj.length==1){
            return obj[0].name; 
        }
        if(obj.length>1){
            alert('Error: Action '+this.act+' is defined multiple times in component.');
            return 'Error: Action '+this.act+' is defined multiple times in component.'; 
        }
        else{
            alert('Error: Action '+this.act+' not defined in component.');
            return 'Error: Action '+this.act+' not defined in component.';
        }
        
    }
  }
});