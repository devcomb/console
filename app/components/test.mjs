import Multipane from './vue-multipane.mjs';
export default Vue.component('test', {
  template: `
  <multipane v-on:paneResizeStop=paneResizeStop v-on:paneResizeStart=paneResizeStart v-on:paneResize=paneResize class="vertical-panes flex "   layout="vertical">

    </multipane>
  `,
  data: function () {
      return {
          nextElementSiblingStart: null,
          resizeElementChildWidthStart: null,
          resizeElementChildSizeStart: null,
          moved: false
      }
  },
  mounted: function () {
    this.$root.$el.childNodes.forEach( 
        function(currentValue, currentIndex, listObj) { 
            if(currentValue.style){
                currentValue.style.width=currentValue.clientWidth + "px"; 
                currentValue.style.minWidth=(parseFloat(currentValue.style.minWidth) * currentValue.clientWidth / 100.0) + "px"; 
            }
        }
    );
  },
  // define methods under the `methods` object
  methods: {
    paneResizeStart: function (pane, resizer, size) { 
        if(pane.nextElementSibling){
            if(pane.nextElementSibling.nextElementSibling){
                //pane.style.width=(parseInt(pane.style.width, 10)+1)+"px";
                this.nextElementSiblingStart=pane.nextElementSibling.nextElementSibling.clientWidth;
                this.resizeElementChildWidthStart=pane.clientWidth;
                this.resize(pane, resizer, size);
                //pane.style.width=this.resizeElementChildWidthStart;
                this.moved = false;
            }
        }
    },
    paneResize: function (pane, resizer, size) {
        if(pane.nextElementSibling){
            if(pane.nextElementSibling.nextElementSibling){
                this.resize(pane, resizer, size);
            }
        }
    },
    paneResizeStop: function (pane, resizer, size) {
    },
    resize: function (pane, resizer, size) {
        var next = pane.nextElementSibling.nextElementSibling;
        var nextMin = parseInt(next.style.minWidth, 10);
        var currentSize = parseInt(size, 10);
        var currentMin = parseInt(pane.style.minWidth, 10);
        var offset = this.resizeElementChildWidthStart-currentSize;
        var nextElementSiblingEnd=this.nextElementSiblingStart+offset;
        if( nextElementSiblingEnd > nextMin && currentSize > currentMin && offset != 0 && this.moved){
            next.style.width=nextElementSiblingEnd+ "px";
            var resizeElementChildWidthMax=size;
            pane.style.width=resizeElementChildWidthMax;
        }
        this.moved = true;
    }
  },
  components: {
    Multipane
  }
});