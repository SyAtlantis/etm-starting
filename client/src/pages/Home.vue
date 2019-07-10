<template>
  <div id="app">
    <Layout>
      <a-icon
        slot="head-center"
        type="home"
        @click="toControl"
        :style="{color:page ===0?'#1890ff':'',cursor:'pointer'}"
      />
      <a-icon
        slot="head-center"
        type="schedule"
        @click="toDepand"
        :style="{color:page ===1?'#1890ff':'',cursor:'pointer'}"
      />
      <a-icon
        slot="head-center"
        type="setting"
        @click="toSetting"
        :style="{color:page ===2?'#1890ff':'',cursor:'pointer'}"
      />
      <a-icon
        slot="head-center"
        type="pic-left"
        @click="toMonitor"
        :style="{color:page ===3?'#1890ff':'',cursor:'pointer'}"
      />

      <!-- <a-icon slot="head-left" v-if="page == 0" type="schedule" @click="toDepand" />
      <a-icon slot="head-left" v-else type="home" @click="toControl" />
      <a-icon slot="head-right" v-show="page == 0" type="setting" @click="toSetting" />
      <a-icon slot="foot-right" v-show="page == 0" type="pic-right" @click="toMonitor" />-->
      <!-- <div slot="head-center"></div> -->
      <div slot="body">
        <Control v-show="page===0" />
        <Depend v-show="page===1" />
        <Setting v-show="page===2" />
        <Monitor v-show="page===3" />
      </div>
      <div slot="foot">©2019 En-Tan-Mo. All Rights Reserved.</div>
    </Layout>
  </div>
</template>

<script>
import Layout from "../components/Layout";
import Control from "./Control";
import Depend from "./Depend";
import Setting from "./Setting";
import Monitor from "./Monitor";

export default {
  name: "app",
  data() {
    return {
      current: [this.$store.state.page]
    };
  },
  components: {
    Layout,
    Control,
    Depend,
    Setting,
    Monitor
  },
  computed: {
    page() {
      return this.$store.state.page;
    }
  },
  methods: {
    toControl() {
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

  max-width: 1080px;
  margin: 0 auto;
  background-color: ghostwhite;
}
</style>
