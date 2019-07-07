<template>
  <div id="app"> 
    <Layout>
      <a-icon slot="head-left" v-if="page == 0" type="schedule" @click="toHome" />
      <a-icon slot="head-left" v-else type="arrow-left" @click="toBack" />
      <a-icon slot="head-right" v-show="page == 0" type="setting" @click="toSet" />
      <div slot="head-center"></div>
      <div slot="body">
        <Home/>
      </div>
      <div slot="foot">©2019 En-Tan-Mo. All Rights Reserved.</div>
    </Layout>
  </div>
</template>

<script>
import Layout from "./components/Layout";
import Home from "./pages/Home";

export default {
  name: 'app',
  components: {
    Layout,
    Home
  },
  computed: {
    page() {
      return this.$store.state.page;
    }
  },
  methods: {
    toHome() {
      this.$store.state.page = 1;
    },
    toSet() {
      this.$store.state.page = 2;
    },
    toBack() {
      this.$store.state.page = 0;
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
</style>
