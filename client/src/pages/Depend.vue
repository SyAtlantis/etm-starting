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
      <!-- <a-form-item
        v-else
        label="参数设置"
        :labelCol="{xs: {span: 4}, sm: {span: 4}}"
        :wrapperCol="{xs: {span: 18}, sm: {span: 18} }"
      >
        <div v-if="isSetted">
          <Tag3 type="setted" />
          <span>可进入设置页面修改！</span>
        </div>
        <div v-else>
          <Tag3 type="unsetted" />
          <span>请先进入设置页面设置！</span>
        </div>
      </a-form-item>-->
    </a-form>
  </div>
</template>

<script>
import QueryInfo from "../components/QueryInfo";
import { depand } from "../modules";

export default {
  name: "depand",
  components: { QueryInfo },
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
  computed: {},
  methods: {}
};
</script>

<style lang="less">
.depand {
  width: 100%;
  height: 100%;
}
</style>
