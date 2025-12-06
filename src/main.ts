import { createApp } from "vue";
import FloatingVue, { Dropdown, Tooltip, Menu } from "floating-vue";
import App from "./App.vue";
import router from "./router";

import "floating-vue/dist/style.css";

const app = createApp(App);

app.use(router);
app.use(FloatingVue);

app.component("VDropdown", Dropdown);
app.component("VMenu", Menu);
app.mount("#app");
