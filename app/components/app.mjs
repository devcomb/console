import {Multipane,MultipaneResizer} from '../dist/vue-multipane.esm.js';
import PaneLeft from './pane-left.mjs';
import Pane from './pane.mjs';

export default Vue.component('test', {
  template: `
  
<multipane v-on:paneResizeStop=paneResizeStop v-on:paneResizeStart=paneResizeStart v-on:paneResize=paneResize layout="vertical"
 class="multipane layout-v" v-bind:style="[styleObject1]" >
    <nav-bar class="ml-1" v-on:actionEvent=actionNavEvent 
     v-bind:apiURL="'/api/getSideNavMenus'" 
     v-bind:isLeft="true" v-bind:currentItem="currentItem" />
   
    <pane-left v-bind:class="{ 'hidden': !this.navActive }" 
     v-bind:currentNavItem="currentItem" class="flex-none rounded-r-lg" 
     v-bind:style="[stylePane,stylePaneLeft]" />

    <multipane-resizer v-bind:class="{ 'hidden': !this.navActive }" v-bind:style="[styleResizer,styleResizerLeft]" ></multipane-resizer>
    <pane v-bind:currentNavItem="currentItem" 
     class="flex-grow rounded-lg" v-bind:style="[stylePane,stylePaneMid]" >
       
    </pane>
    
    <multipane-resizer v-bind:style="[styleResizer,styleResizerRight]" />

    <pane v-bind:currentNavItem="currentItemRight" 
     v-bind:class="{ 'hidden': !this.navActiveRight }"  
     class="flex-none rounded-l-lg" v-bind:style="[stylePane,stylePaneRight]" />

    <nav-bar v-on:actionEvent=actionNavEventRight v-bind:isLeft="false" 
     v-bind:apiURL="'/api/getSideNavRightMenus'" 
     v-bind:currentItem="currentItemRight"></nav-bar>
    
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
        styleResizerLeft: {
            display: "block !important"
        },     
        styleResizerRight: {
            display: "block !important"
        },
        styleResizer: {
            minWidth: '.2em',
            width: '.2em !important',
            'margin-left': '0px !important',
            'left': '0px !important',
            'right': '0px !important'
        },
        currentSize: null,
        navActive: true,
        navActiveRight: true,
        currentItem: "get_ledger",
        currentItemRight: "none"
      }
  },
  mounted: function () {
    this.$root.$el.childNodes.forEach( 
        function(currentValue, currentIndex, listObj) { 
            if(currentValue.style && !currentValue.classList.contains('flex-grow') && currentValue.className!=="multipane-resizer" ){
                currentValue.style.width=currentValue.clientWidth + "px"; 
            }
            if(currentValue.style && currentValue.style.minWidth.includes("%") ){
                currentValue.style.minWidth=(parseFloat(currentValue.style.minWidth) * currentValue.clientWidth / 100.0) + "px"; 
            }
        }
    );
    this.navActiveRight=false;
    this.styleResizerRight.display="none !important";
  },
  // define methods under the `methods` object
  methods: {
    actionNavEvent: function (action) {
        if(this.currentItem===action){
            this.navActive=false;
            this.currentItem="none";
            this.styleResizerLeft.display="none !important";
        }
        else{
            this.navActive=true;
            this.currentItem=action;
            this.styleResizerLeft.display="block !important";
        }
    },
    actionNavEventRight: function (action) {
        if(this.currentItemRight===action){
            this.navActiveRight=false;
            this.currentItemRight="none";
            this.styleResizerRight.display="none !important";
        }
        else{
            this.navActiveRight=true;
            this.currentItemRight=action;
            this.styleResizerRight.display="block !important";
        }
    },
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