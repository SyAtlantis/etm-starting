<template>
  <div class="queryinfo">
    <a-spin class="queryinfo-spin" :spinning="spinning">
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      <div v-if="status =='installed'">
        <Tag1 type="installed" />
        <span>版本：{{version}}</span>
      </div>
      <div v-else-if="status =='uninstalled'">
        <Tag1 type="uninstalled" />
        <a-button type="primary" @click="install">安装</a-button>
      </div>
      <div v-else-if="status =='installing'">
        <Tag1 type="installing" />
      </div>
      <div v-else-if="status =='installfail'">
        <Tag1 type="installfail" />
        <a-button type="primary" @click="install">重新安装</a-button>
      </div>
      <div v-else-if="status =='checking'">
        <Tag1 type="checking" />
      </div>
      <div v-else>
        <Tag1 type="checkfail" />
        <a-button type="primary" @click="check">重新检测</a-button>
      </div>
    </a-spin>
  </div>
</template>

<script>
import Tag1 from "./Tag1";

export default {
  name: "queryinfo",
  components: { Tag1 },
  data() {
    return {
      spinning: true,
      status: "checkfail",
      version: ""
    };
  },
  mounted() {
    this.check();
  },
  props: {
    func1: {
      type: Function,
      required: true
    },
    func2: {
      type: Function,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    check() {
      this.status = "checking";
      this.spinning = true;

      this.func1()
        .then(res => {
          let { data, status } = res;
          if (!data || status !== 200) {
            throw new Error("Result data or status error!");
          }

          if (data.success) {
            console.log(
              `check ${this.name} success===>${JSON.stringify(data.results)}`
            );

            let re = /\D*\d+\.\d+\.\d+$/;
            if (data.results && re.test(data.results.trim())) {
              this.spinning = false;
              this.status = "installed";
              this.version = data.results;

              this.$store.state.depend[this.name].status = "installed";
              this.$store.state.depend[this.name].version = data.results;
            } else {
              throw new Error("Requested data does not match.");
            }
          } else {
            this.spinning = false;
            this.status = "uninstalled";
            this.$store.state.depend[this.name].status = "uninstalled";

            // this.$message.warning(
            //   `check ${this.name} failure===>${JSON.stringify(data.message)}`
            // );
            console.log(
              `check ${this.name} failure===>${JSON.stringify(data.message)}`
            );
          }
        })
        .catch(err => {
          this.spinning = false;
          this.status = "checkfail";
          this.$store.state.depend[this.name].status = "checkfail";

          this.$message.error(
            `check ${this.name} error===>${JSON.stringify(err)}`
          );
          console.log(`check ${this.name} error===>${JSON.stringify(err)}`);
        });
    },
    install() {
      this.status = "installing";
      this.spinning = true;

      this.func2()
        .then(res => {
          let { data, status } = res;
          if (!data || status !== 200) {
            throw new Error("Result data or status error!");
          }

          if (data.success) {
            console.log(
              `install ${this.name} success===>${JSON.stringify(data.results)}`
            );
            this.spinning = false;
            this.status = "installed";
            this.check();
          } else {
            this.spinning = false;
            this.status = "installfail";

            this.$message.warning(
              `install ${this.name} failure===>${JSON.stringify(data.message)}`
            );
            console.log(
              `install ${this.name} failure===>${JSON.stringify(data.message)}`
            );
          }
        })
        .catch(err => {
          this.spinning = false;
          this.status = "installfail";

          this.$message.error(
            `install ${this.name} error===>${JSON.stringify(err)}`
          );
          console.log(`install ${this.name} error===>${JSON.stringify(err)}`);
        });
    }
  }
};
</script>

<style lang="less">
.queryinfo-spin {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
