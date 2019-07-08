<template>
  <div id="app">
    <Layout>
      <a-icon slot="head-left" v-if="page == 0" type="schedule" @click="toDepand" />
      <a-icon slot="head-left" v-else type="arrow-left" @click="toBack" />
      <a-icon slot="head-right" v-show="page == 0" type="setting" @click="toSetting" />
      <a-icon slot="foot-right" v-show="page == 0" type="pic-right" @click="toMonitor" />
      <div slot="head-center"></div>
      <div slot="body">
        <Home v-show="page===0" />
        <Depand v-show="page===1" />
        <Setting v-show="page===2" />
        <Monitor v-show="page===3" />
      </div>
      <div slot="foot">©2019 En-Tan-Mo. All Rights Reserved.</div>
    </Layout>
  </div>
</template>

<script>
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Depand from "./pages/Depand";
import Setting from "./pages/Setting";
import Monitor from "./pages/Monitor";

export default {
  name: "app",
  components: {
    Layout,
    Home,
    Depand,
    Setting,
    Monitor
  },
  computed: {
    page() {
      return this.$store.state.page;
    }
  },
  methods: {
    toBack() {
      this.$store.state.page = 0;
    },
    toDepand() {
      this.$store.state.page = 1;
    },
    toSetting() {
      this.$store.state.page = 2;
    },
    toMonitor() {
      this.$store.state.page = 3;
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
</style>
