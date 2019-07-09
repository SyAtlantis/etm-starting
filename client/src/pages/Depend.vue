<template>
  <div class="depand">
    <a-form v-for="item in formList" :key="item.name">
      <a-form-item
        v-if="item.name !='setting'"
        class="env-item"
        :key="item.name"
        :label="item.label"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 16}"
        :required="item.required"
      >
        <QueryInfo :func1="item.func1" :func2="item.func2" :name="item.name"></QueryInfo>
      </a-form-item>
      <a-form-item v-else label="参数设置" :labelCol="{span: 5}" :wrapperCol="{span: 16}">
        <div v-if="isSetted">
          <Tag3 type="setted" />
          <a-button class="btn" type="primary" @click="toSetting">修改设置</a-button>
        </div>
        <div v-else>
          <Tag3 type="unsetted" />
          <a-button class="btn" type="primary" @click="toSetting">进入设置</a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import QueryInfo from "../components/QueryInfo";
import Tag3 from "../components/Tag3";

import { depand } from "../modules";

export default {
  name: "depand",
  components: { QueryInfo, Tag3 },
  data() {
    return {
      formList: [
        {
          name: "nodeInfo",
          label: "Nodejs",
          required: true,
          func1: depand.getNodeInfo,
          func2: depand.installNode
        },
        {
          name: "pm2Info",
          label: "PM2",
          required: true,
          func1: depand.getPm2Info,
          func2: depand.installPm2
        },
        {
          name: "etmInfo",
          label: "EnTanMo",
          required: true,
          func1: depand.getEtmInfo,
          func2: depand.installEtm
        },
        {
          name: "setting"
        }
      ]
    };
  },
  computed: {
    isSetted() {
      return this.$store.state.setting.port;
    }
  },
  methods: {
    toSetting() {
      this.$store.state.page = 2;
    }
  }
};
</script>

<style lang="less">
.depand {
  width: 100%;
  height: 100%;
  padding: 24px 40px;
}
</style>
