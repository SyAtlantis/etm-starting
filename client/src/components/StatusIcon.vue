<template>
  <a-icon
    class="status-icon"
    :type="types[type].icon"
    theme="twoTone"
    :twoToneColor="types[type].color"
  />
</template>

<script>
export default {
  name: "status-icon",
  components: {},
  data() {
    return {
      types: {
        normal: {
          color: "#74bd4f",
          icon: "check-circle"
        },
        error: {
          color: "#e56255",
          icon: "close-circle"
        },
        loading: {
          color: "#f7c443",
          icon: "info-circle"
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
.status-icon {
  width: 24px;
  height: 24px;
  font-size: 24px;
  align-items: center;
}
</style>
