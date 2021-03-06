import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    // cares about to keep user DATA in vuex after reload
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      store.commit("Auth/SET_USER_DATA", userData);
    }
  },
  render: (h) => h(App),
}).$mount("#app");
