<template>
  <a-tag class="tag" :color="types[type].color">{{types[type].text}}</a-tag>
</template>

<script>
export default {
  name: "tag",
  components: {},
  data() {
    return {
      types: {
        normal: {
          color: "green",
          text: "正常"
        },
        error: {
          color: "red",
          text: "错误"
        },
        loading: {
          color: "purple",
          text: "加载中"
        }
      }
    };
  },
  props: {
    type: {
      type: String,
      validator: function(value) {
        return ["normal", "error", "loading"].indexOf(value) !== -1;
      }
    }
  },
  methods: {}
};
</script>

<style lang="less">
.tag {
  width: 65px;
  text-align: center;
  margin: 0 10px;
}
</style>
