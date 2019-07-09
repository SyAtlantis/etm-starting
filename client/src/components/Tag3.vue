<template>
  <a-tag class="tag3" :color="types[type].color">{{types[type].text}}</a-tag>
</template>

<script>
export default {
  name: "tag3",
  components: {},
  data() {
    return {
      types: {
        setted: {
          color: "green",
          text: "已设置"
        },
        unsetted: {
          color: "red",
          text: "未设置"
        },
        started: {
          color: "green",
          text: "已启动"
        },
        unstarted: {
          color: "red",
          text: "未启动"
        }
      }
    };
  },
  props: {
    type: {
      type: String,
      validator: function(value) {
        return (
          ["setted", "unsetted", "started", "unstarted"].indexOf(value) !== -1
        );
      }
    }
  },
  methods: {}
};
</script>

<style lang="less">
.tag3 {
  width: 65px;
  text-align: center;
  margin: 0 10px;
}
</style>
