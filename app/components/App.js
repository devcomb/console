export default Vue.component('menu-item', {
  template: `
  <button
      v-on:click="actions"
      class="rounded-r-lg flex-1 text-black text-left bg-orange-comb hover:bg-blue-dark px-1 py-1 mb-1"
  >{{ title }}</button>
  `,
  props: ['title','action'],
  data: function () {
    return { 
        msg: 'hello',
        object:  [
            {name: 'get_ledger'},
            {name: 'put_ledger'},
            {name: 'chaincode'},
            {name: 'policies'},
            {name: 'certs'},
            {name: 'users'}
        ]
    };
  },
  // define methods under the `methods` object
  methods: {
    actions: function (event) {
      console.log(this.findFunction);
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