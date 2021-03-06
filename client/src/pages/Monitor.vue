<template>
  <div class="monitor">
    <a-list :dataSource="listData" itemLayout="vertical">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta>
          <a slot="title">{{item.title}}</a>
          <a-button
            class="title-reload"
            slot="title"
            icon="sync"
            size="small"
            type="primary"
            shape="circle"
            :disabled="item.status ==='notrun'"
            @click="reload(item.name)"
          />
          <Tag2 class="title-tag" :type="item.status" slot="title" />
          <a-avatar slot="avatar" :size="48" shape="square" :src="item.avatar" />
          <span
            v-if="item.status == 'error'||item.status == 'notrun'"
            slot="description"
          >{{item.message}}</span>
          <div v-else slot="description" v-for="(subItems,i) of item.actions" :key="i">
            <span v-for="({name, value}, index) in subItems" :key="index">
              <span>{{name}} : {{value}}</span>
              <a-divider type="vertical" v-if="index !== subItems.length-1" />
            </span>
          </div>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import Tag2 from "../components/Tag2";

import { monitor } from "../modules";

export default {
  name: "monitor",
  components: { Tag2 },
  data() {
    return {};
  },
  mounted() {
    this.reload();
  },
  computed: {
    listData() {
      return [
        {
          title: "网络连接",
          name: "netInfo",
          avatar: require("@/assets/net.png"),
          status: this.$store.state.monitor.netInfo.status,
          message: this.$store.state.monitor.netInfo.message,
          actions: [
            [
              {
                name: "公网IP",
                value: this.$store.state.monitor.netInfo.data.publicIp
              },
              {
                name: "端口",
                value: this.$store.state.setting.port
              }
            ]
          ]
        },
        {
          title: "显卡信息",
          name: "gpuInfo",
          avatar: require("@/assets/gpu.png"),
          status: this.$store.state.monitor.gpuInfo.status,
          message: this.$store.state.monitor.gpuInfo.message,
          actions: this.$store.state.monitor.gpuInfo.data.map(item => {
            return [
              {
                name: "型号",
                value: item.model
              },
              {
                name: "内存",
                value: item.vram
              }
            ];
          })
        },
        {
          title: "进程状态",
          name: "procInfo",
          avatar: require("@/assets/proc.png"),
          status: this.$store.state.monitor.procInfo.status,
          message: this.$store.state.monitor.procInfo.message,
          actions: [
            [
              {
                name: "进程状态",
                value: this.$store.state.monitor.procInfo.data.status
              }
            ]
          ]
        },
        {
          title: "同步情况",
          name: "syncInfo",
          avatar: require("@/assets/sync.png"),
          status: this.$store.state.monitor.syncInfo.status,
          message: this.$store.state.monitor.syncInfo.message,
          actions: [
            [
              {
                name: "是否在同步",
                value: this.$store.state.monitor.syncInfo.data.syncing
              },
              {
                name: "正在同步区块数量",
                value: this.$store.state.monitor.syncInfo.data.blocks
              },
              {
                name: "区块高度",
                value: this.$store.state.monitor.syncInfo.data.height
              }
            ]
          ]
        },
        {
          title: "出块情况",
          name: "blockInfo",
          avatar: require("@/assets/block.png"),
          status: this.$store.state.monitor.blockInfo.status,
          message: this.$store.state.monitor.blockInfo.message,
          actions: [
            [
              {
                name: "成功块数",
                value: this.$store.state.monitor.blockInfo.data.producedblocks
              },
              {
                name: "失败块数",
                value: this.$store.state.monitor.blockInfo.data.missedblocks
              }
            ],
            [
              {
                name: "出块率",
                value: this.$store.state.monitor.blockInfo.data.productivity
              },
              {
                name: "总奖励",
                value: this.$store.state.monitor.blockInfo.data.rewards
              }
            ]
          ]
        }
      ];
    },
    isStart() {
      return this.$store.state.control.start;
    }
  },
  watch: {
    isStart: function() {
      this.reload();
    }
  },
  methods: {
    reload(name) {
      if (!name) {
        this.getInfo("netInfo");
        this.getInfo("gpuInfo");
        this.getInfo("procInfo");
        this.getInfo("syncInfo");
        this.getInfo("blockInfo");
      } else {
        this.getInfo(name);
      }
    },
    getInfo(name) {
      if (["procInfo", "syncInfo", "blockInfo"].includes(name) && !this.start) {
        this.$store.state.monitor[name].status = "notrun";
        this.$store.state.monitor[name].message = "项目未启动！";
        return;
      }

      const funcs = {
        netInfo: monitor.getNetInfo,
        gpuInfo: monitor.getGpuInfo,
        procInfo: monitor.getProcInfo,
        syncInfo: monitor.getSyncInfo,
        blockInfo: monitor.getBlockInfo
      };
      let func = funcs[name];

      this.$store.state.monitor[name].status = "loading";

      func()
        .then(res => {
          console.log(res.data);
          let { data, status } = res;
          if (!data || status !== 200) {
            throw new Error("Result data or status error!");
          }

          if (data.success) {
            if (data.results) {
              this.$store.state.monitor[name].status = "normal";
              Object.assign(this.$store.state.monitor[name].data, data.results);
            } else {
              throw new Error("Requested data does not match.");
            }
          } else {
            throw new Error(data.message);
          }
        })
        .catch(err => {
          this.$store.state.monitor[name].status = "error";
          this.$store.state.monitor[name].message = `${err}`;
        });
    }
  }
};
</script>

<style lang="less">
.monitor {
  width: 100%;
  height: 100%;
  padding: 24px 40px;

  .title-reload {
    margin-left: 20px;
  }

  .title-tag {
    float: right;
  }
}
</style>
