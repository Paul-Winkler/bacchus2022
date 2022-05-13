import WineChartVue from "./WineChart.vue"

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component("WineChart", WineChartVue);
})