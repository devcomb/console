export default Vue.component('menu-item', {
  template: `
  <div
      class="rounded-r-lg flex-1 text-grey-darker text-center bg-orange-lighter px-1 py-1 mb-1"
  >{{ title }}</div>
  `,
  props: ['title']
});