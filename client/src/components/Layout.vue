<template>
  <div class="layout">
    <div class="head">
      <div class="head-left">
        <slot name="head-left"></slot>
      </div>
      <div class="head-center">
        <slot name="head-center"></slot>
      </div>
      <div class="head-right">
        <slot name="head-right"></slot>
      </div>
    </div>
    <div class="body">
      <slot name="body"></slot>
    </div>
    <div class="foot">
      <slot name="foot"></slot>
      <div class="foot-right">
        <slot name="foot-right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "layout",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less">
@head-height: 50px;
@foot-height: 40px;
@icon-width: 60px;

.layout {
  width: 100%;
  height: 100%;

  .head {
    height: @head-height;
    display: flex;
    justify-content: space-between;
    background-color: #dde3e8;

    align-items: center;

    .head-left {
      width: @icon-width;
      height: @head-height;
      font-size: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: red;
    }

    .head-center {
      width: calc(100% - @icon-width * 2);
      height: @head-height;
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: blue;
    }

    .head-right {
      width: @icon-width;
      height: @head-height;
      font-size: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: red;
    }
  }

  .body {
    height: calc(100% - @head-height - @foot-height);
    // background-color: beige;
  }

  .foot {
    height: @foot-height;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.65);

    .foot-right {
      width: @icon-width;
      height: @head-height;
      bottom: 40px;
      right: 0;
      position: absolute;
      font-size: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: red;
    }
  }
}
</style>
