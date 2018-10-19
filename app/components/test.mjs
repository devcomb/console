export default Vue.component('test', {
  template: `
  <multipane v-on:paneResizeStop=paneResizeStop v-on:paneResizeStart=paneResizeStart v-on:paneResize=paneResize class="vertical-panes flex "  v-bind:style="[styleObject1]" layout="vertical">

    <div  v-bind:style="[stylePane,stylePaneLeft]" class="pane w-1/4 flex-none">
        <div>
        <h6 class="title is-6">Pane 1a</h6>
        <p class="subtitle is-6">Fixed width.</p>
        <p>
            <small>
            <strong>Configured with:</strong><br/>
            minWidth: 100px<br/>
            width: 150px<br/>
            maxWidth: 200px<br/>
            </small>
        </p>
        </div>
    </div>
    <multipane-resizer ></multipane-resizer>
    <div class="pane w-1/2 flex-none" v-bind:style="[stylePane,stylePaneMid]" >
        <div>
        <h6 class="title is-6">Pane 2</h6>
        <p class="subtitle is-6">Fluid width.</p>
        <p>
            <small>
            <strong>Configured with:</strong><br/>
            width: 25%<br/>
            maxWidth: 50%<br/>
            </small>
        </p>
        </div>
    </div>
    <multipane-resizer></multipane-resizer>
    <div class="pane w-1/4 flex-grow" v-bind:style="[stylePane,stylePaneRight]" >
        <div>
        <h6 class="title is-6">Pane 3</h6>
        <p class="subtitle is-6">Takes remaining available space.</p>

        <p>
            <small>
            <strong>Configured with:</strong><br/>
            flex-grow: 1<br/>
            </small>
        </p>
        </div>
    </div>
    
    </div>
    </multipane>
  `,
  data: function () {
      return {
          styleObject1: {
                width: '100%',
                height: '400px',
                border: '1px solid #ccc',
                'align-content': 'stretch'
          },
          stylePane: {
                'text-align': 'left',
                overflow: 'hidden',
                background: '#eee',
                'border-left': '1px solid #ccc'
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
          nextElementSiblingStart: null,
          nextElementSiblingEnd: null,
          resizeElementChildWidthStart: null,
          resizeElementChildWidthEnd: null,
          resizeElementChildWidthCurrent: null,
          resizeElementChildWidthMax: null
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
                this.nextElementSiblingStart=pane.nextElementSibling.nextElementSibling.clientWidth;
                this.resizeElementChildWidthStart=pane.clientWidth;
            }
        }
    },
    paneResize: function (pane, resizer, size) {
        if(pane.nextElementSibling){
            if(pane.nextElementSibling.nextElementSibling){
                var next = pane.nextElementSibling.nextElementSibling;
                var nextMin = parseInt(next.style.minWidth, 10);
                var currentSize = parseInt(size, 10);
                var currentMin = parseInt(pane.style.minWidth, 10);
                this.nextElementSiblingEnd=this.nextElementSiblingStart+(this.resizeElementChildWidthStart-currentSize);
                if(this.nextElementSiblingEnd > nextMin && currentSize > currentMin ){
                    next.style.width=this.nextElementSiblingEnd+ "px";
                    this.resizeElementChildWidthMax=size;
                }
                pane.style.width=this.resizeElementChildWidthMax;
            }
        }
    },
    paneResizeStop: function (pane, resizer, size) {
    }
  }
});