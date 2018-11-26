export default Vue.component('header-item', {
  template: `
  <div 
   v-on:click="actions"
   class="hover:bg-blue-dark h-full pl-2 pr-2 items-center flex"
  >
    <div class="text-white">{{ title }}</div>
  </div>
  `,
  props: ['title','action'],
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
      console.log(this.title+": "+this.action);
      //console.log(this.findFunction);
    }
  },
  computed:{
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