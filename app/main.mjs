import Header from './components/header.mjs';
import Nav from './components/nav.mjs';
import App from './components/app.mjs';

new Vue({
   render: h => h(App)
 }).$mount(`#app`);

 new Vue({
   render: h => h(Header)
 }).$mount(`#header`);

