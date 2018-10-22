var LAYOUT_HORIZONTAL = 'horizontal';
var LAYOUT_VERTICAL = 'vertical';
import MultipaneResizer from './vue-multipaneresizer.mjs';
export default Vue.component('multipane', {
  template:`
  <div class="multipane layout-v" v-bind:style="[styleObject1]" v-on:mousedown="onMouseDown" >
   
    <div  v-bind:style="[stylePane,stylePaneLeft]" class="pane mr-1 w-1/4 flex-none">
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
    <div class="pane w-1/2 mr-1 flex-none" v-bind:style="[stylePane,stylePaneMid]" >
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
</div>
   `,
  props: {
    layout: {
      type: String,
      default: LAYOUT_VERTICAL,
    },
  },

  data: function data() {
    return {
      isResizing: false,
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
        resizeElementChildWidthStart: null,
        resizeElementChildSizeStart: null,
        moved: false
    };
  },

  computed: {
    classnames: function classnames() {
      return [
        'multipane',
        'layout-' + this.layout.slice(0, 1),
        this.isResizing ? 'is-resizing' : '' ];
    },
    cursor: function cursor() {
      return this.isResizing
        ? this.layout == LAYOUT_VERTICAL ? 'col-resize' : 'row-resize'
        : '';
    },
    userSelect: function userSelect() {
      return this.isResizing ? 'none' : '';
    },
  },

  methods: {
    onMouseDown: function onMouseDown(ref) {
      var resizer = ref.target;
      var initialPageX = ref.pageX;
      var initialPageY = ref.pageY;

      if (resizer.className && resizer.className.match('multipane-resizer')) {
        var self = this;
        var container = self.$el;
        var layout = self.layout;

        var pane = resizer.previousElementSibling;
        var initialPaneWidth = pane.offsetWidth;
        var initialPaneHeight = pane.offsetHeight;

        var usePercentage = !!(pane.style.width + '').match('%');

        var addEventListener = window.addEventListener;
        var removeEventListener = window.removeEventListener;

        var resize = function (initialSize, offset) {
          if ( offset === void 0 ) offset = 0;

          if (layout == LAYOUT_VERTICAL) {
            var containerWidth = container.clientWidth;
            var paneWidth = initialSize + offset;

            return (pane.style.width = usePercentage
              ? paneWidth / containerWidth * 100 + '%'
              : paneWidth + 'px');
          }

          if (layout == LAYOUT_HORIZONTAL) {
            var containerHeight = container.clientHeight;
            var paneHeight = initialSize + offset;

            return (pane.style.height = usePercentage
              ? paneHeight / containerHeight * 100 + '%'
              : paneHeight + 'px');
          }
        };

        // This adds is-resizing class to container
        self.isResizing = true;

        // Resize once to get current computed size
        var size = resize();

        // Trigger paneResizeStart event
        self.$emit('paneResizeStart', pane, resizer, size);

        var onMouseMove = function(ref) {
          var pageX = ref.pageX;
          var pageY = ref.pageY;

          size =
            layout == LAYOUT_VERTICAL
              ? resize(initialPaneWidth, pageX - initialPageX)
              : resize(initialPaneHeight, pageY - initialPageY);

          self.$emit('paneResize', pane, resizer, size);
        };

        var onMouseUp = function() {
          // Run resize one more time to set computed width/height.
          size =
            layout == LAYOUT_VERTICAL
              ? resize(pane.clientWidth)
              : resize(pane.clientHeight);

          // This removes is-resizing class to container
          self.isResizing = false;

          removeEventListener('mousemove', onMouseMove);
          removeEventListener('mouseup', onMouseUp);

          self.$emit('paneResizeStop', pane, resizer, size);
        };

        addEventListener('mousemove', onMouseMove);
        addEventListener('mouseup', onMouseUp);
      }
    },
  },
  //render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.classnames,style:({ cursor: _vm.cursor, userSelect: _vm.userSelect }),on:{"mousedown":_vm.onMouseDown}},[_vm._t("default")],2)},
  staticRenderFns: [],
  components: {
    MultipaneResizer
  }
});

//(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=".multipane { display: flex; } .multipane.layout-h { flex-direction: column; } .multipane.layout-v { flex-direction: row; } .multipane > div { position: relative; z-index: 1; } .multipane-resizer { display: block; position: relative; z-index: 2; } .layout-h > .multipane-resizer { width: 100%; height: 10px; margin-top: -10px; top: 5px; cursor: row-resize; } .layout-v > .multipane-resizer { width: 10px; height: 100%; margin-left: -10px; left: 5px; cursor: col-resize; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();