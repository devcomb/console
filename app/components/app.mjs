import {Multipane,MultipaneResizer} from '../dist/vue-multipane.esm.js';
import Pane from './pane.mjs';

export default Vue.component('test', {
  template: `
  
<multipane v-on:paneResizeStop=paneResizeStop v-on:paneResizeStart=paneResizeStart v-on:paneResize=paneResize layout="vertical" class="multipane layout-v" v-bind:style="[styleObject1]" >
   <nav-bar></nav-bar>
   
    <pane class="flex-none border-2 border-orange-comb rounded-r-lg" v-bind:style="[stylePane,stylePaneLeft]" >
       Place holder.
    </pane>
    <multipane-resizer v-bind:style="[styleResizer]" ></multipane-resizer>
    <pane class="flex-grow rounded-lg" v-bind:style="[stylePane,stylePaneMid]" >
        Place holder.
    </pane>
    <multipane-resizer  v-bind:style="[styleResizer]" />
    <pane class="flex-none border-2 border-orange-comb rounded-l-lg" v-bind:style="[stylePane,stylePaneRight]" />
    
</multipane>
  `,
  data: function () {
      return {
        info: null,
        nextElementSiblingStart: null,
        resizeElementChildWidthStart: null,
        resizeElementChildSizeStart: null,
        resizeElementChildSizeMax: 0,
        styleObject1: {
            width: '100%',
            height: '100%',
            'align-content': 'stretch'
        },
        stylePane: {
            'text-align': 'left',
            overflow: 'hidden'
        },
        stylePaneMid: {
            minWidth: '10%'
        },
        stylePaneLeft: {
            minWidth: '10%'
        },
        stylePaneRight: {
            minWidth: '10%'
        },
        styleResizer: {
            minWidth: '.2em',
            width: '.2em !important',
            'margin-left': '0px !important',
            'left': '0px !important',
            'right': '0px !important'
        },
        currentSize: null
      }
  },
  mounted: function () {
    this.$root.$el.childNodes.forEach( 
        function(currentValue, currentIndex, listObj) { 
            if(currentValue.style && !currentValue.classList.contains('flex-grow') && currentValue.className!=="multipane-resizer" ){
                currentValue.style.width=currentValue.clientWidth + "px"; 
                //currentValue.style.minWidth=(parseFloat(currentValue.style.minWidth) * currentValue.clientWidth / 100.0) + "px"; 
            }
        }
    );
  },
  // define methods under the `methods` object
  methods: {
    greet: function (event) {
      // `this` inside methods point to the Vue instance
      alert('Hello ' + this.name + '!')
      // `event` is the native DOM event
      alert(event.target.tagName)
    },
    paneResizeStart: function (pane, resizer, size) { 
        this.currentSize = size;
        if(pane.nextElementSibling){
            if(pane.nextElementSibling.nextElementSibling){
                this.resizeElementChildSizeMax=pane.offsetWidth;
                this.nextElementSiblingStart=pane.nextElementSibling.nextElementSibling.offsetWidth;
                this.resizeElementChildWidthStart=pane.offsetWidth;
            }
        }
    },
    paneResize: function (pane, resizer, size) {
        this.currentSize = size;
        if(pane.nextElementSibling){
            if(pane.nextElementSibling.nextElementSibling){
                this.resize(pane, resizer, size);
            }
        }
    },
    paneResizeStop: function (pane, resizer, size) {
        if(pane.nextElementSibling){
            if(pane.nextElementSibling.nextElementSibling){
                //this.resize(pane, resizer, size);
                if( pane.classList.contains('flex-grow') ){
                    pane.style.width="";
                }
                if( pane.nextElementSibling.nextElementSibling.classList.contains('flex-grow') ){
                    pane.nextElementSibling.nextElementSibling.style.width="";
                    pane.style.width=this.currentSize;
                }
            }
        }
    },
    resize: function (pane, resizer, size) {
        var next = pane.nextElementSibling.nextElementSibling;
        var nextMin = parseInt(next.style.minWidth, 10);
        var currentSize = parseInt(size, 10);
        var currentMin = parseInt(pane.style.minWidth, 10);
        var offset = this.resizeElementChildWidthStart-currentSize;
        var nextElementSiblingEnd=this.nextElementSiblingStart+offset;
        if( nextElementSiblingEnd > nextMin && currentSize > currentMin && offset != 0 ){
            next.style.width=nextElementSiblingEnd+ "px";
            this.resizeElementChildSizeMax=currentSize;
        }
        else{
            pane.style.width=this.resizeElementChildSizeMax+"px";
        }
    }
  },
  components: {
    Multipane,
    MultipaneResizer
  }
});