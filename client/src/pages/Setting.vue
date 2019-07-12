<template>
  <div class="setting">
    <a-spin :spinning="spinning" tip="保存中...">
      <div class="setting-content">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item label="公网IP" :labelCol="{span: 5}" :wrapperCol="{span: 16}">
            <a-input
              class="input-ip"
              placeholder="请输入公网IP!"
              v-decorator="[
                'publicIp',
                {
                  rules: [{
                    type: 'string', message: 'The input is not valid IP',
                  }, { 
                    validator: checkPublicIp 
                  }],
                  initialValue: this.$store.state.setting.publicIp,
                }
              ]"
            />
            <a-button class="button-ip" type="primary" icon="sync" @click="getIp" />
          </a-form-item>
          <a-form-item label="端口号" :labelCol="{span: 5}" :wrapperCol="{span: 16}">
            <a-input
              placeholder="请输入端口号!"
              v-decorator="[
                'port',
                {
                  rules: [{
                    type: 'string', message: 'The input is not valid port',
                  }, {
                    required: true, message: 'Please input your port!',
                  },{ 
                    validator: checkPort 
                  }],
                  initialValue: this.$store.state.setting.port,
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="Secret" :labelCol="{span: 5}" :wrapperCol="{span: 16}">
            <a-textarea
              :rows="2"
              placeholder="请输入Secret!【非受托人无需输入】"
              v-decorator="[
                'secret',
                {
                  rules: [{
                    type: 'string', message: 'The input is not valid secret',
                  }, ,{ 
                    validator: checkSecret 
                  }],
                  initialValue: this.$store.state.setting.secret,
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="Magic" :labelCol="{span: 5}" :wrapperCol="{span: 16}">
            <a-input
              placeholder="请输入Magic!"
              v-decorator="[
                'magic',
                {
                  rules: [{
                    type: 'string', message: 'The input is not valid magic',
                  }, {
                    required: true, message: 'Please input your magic!',
                  },{ 
                    validator: checkMagic 
                  }],
                  initialValue: this.$store.state.setting.magic,
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="种子节点" :labelCol="{span: 5}" :wrapperCol="{span: 16}">
            <a-textarea
              :rows="4"
              placeholder="请输入Peers数组, 如:[{'ip':'123.456.78.90','port':'4096'}]"
              v-decorator="[
                'peers',
                {
                  rules: [{
                  type: 'string', message: 'The input is not valid peers', 
                  }, ,{
                  validator: checkPeers
                  }],
                  initialValue: this.$store.state.setting.peers,
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="注意" :labelCol="{span: 5}" :wrapperCol="{span: 16}" required>
            <span class="setting-tip">保存后需要重新启动项目才能生效！！！</span>
          </a-form-item>
          <a-form-item :labelCol="{span: 5}" :wrapperCol="{span: 16, offset: 4}">
            <div class="setting-button">
              <a-button type="primary" html-type="submit">保存</a-button>
              <a-button type="primary" @click="cancle">取消</a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { setting } from "../modules";

export default {
  name: "setting",
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      spinning: false
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.save(values);
        }
        console.log("Input parameter error");
      });
    },
    query() {
      this.spinning = true;

      setting
        .getVulue()
        .then(res => {
          let { data } = res;
          if (!data || res.status !== 200) {
            throw new Error("Result data or status error!");
          }

          if (data.success) {
            if (data.results) {
              this.spinning = false;
              this.$store.state.setting.publicIp = data.results.publicIp;
              this.$store.state.setting.port = data.results.port;
              this.$store.state.setting.secret = data.results.secret;
              this.$store.state.setting.peers = JSON.stringify(
                data.results.peers
              );
              this.$store.state.setting.magic = data.results.magic;
            } else {
              throw new Error("Requested data does not match.");
            }
          } else {
            throw new Error(data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.spinning = false;
        });
    },
    save(data) {
      console.log("save");
      this.spinning = true;

      setting
        .setVulue(data)
        .then(res => {
          console.log(res);
          this.spinning = false;
          this.$store.state.setting.publicIp = data.publicIp;
          this.$store.state.setting.port = data.port;
          this.$store.state.setting.secret = data.secret;
          this.$store.state.setting.peers = data.peers;
          this.$store.state.setting.magic = data.magic;
        })
        .catch(err => {
          console.log(err);
          this.spinning = false;
        });
    },
    cancle() {
      this.form.setFieldsValue({
        publicIp: this.$store.state.setting.publicIp,
        port: this.$store.state.setting.port,
        secret: this.$store.state.setting.secret,
        peers: this.$store.state.setting.peers,
        magic: this.$store.state.setting.magic
      });
    },
    getIp() {
      let publicIp = this.form.getFieldValue("publicIp");

      if (this.$store.state.monitor.netInfo.data.publicIp !== publicIp) {
        this.form.setFieldsValue({
          publicIp: this.$store.state.monitor.netInfo.data.publicIp
        });
      }
    },

    checkPublicIp(rule, value, cb) {
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (value && !reg.test(value)) {
        return cb("The input is not valid IP!");
      }
      cb();
    },
    checkPort(rule, value, cb) {
      let reg = /^(\d)+$/g;
      let p = parseInt(value);
      if (!reg.test(value) || p > 65535 || p <= 0) {
        return cb("The input is not valid port!");
      }
      cb();
    },
    checkSecret(rule, value, cb) {
      cb();
    },
    checkMagic(rule, value, cb) {
      if (value.length !== 8) {
        return cb("The magic length is not 8!");
      }
      cb();
    },
    checkPeers(rule, value, cb) {
      try {
        if (JSON.parse(value) instanceof Array) {
          cb();
        } else {
          return cb("The peer is not array!");
        }
      } catch (error) {
        return cb("The peer is not array!");
      }
    }
  }
};
</script>

<style lang="less">
.setting {
  width: 100%;
  height: 100%;
  padding: 24px 40px;

  .setting-content {
    .input-ip {
      width: calc(100% - 50px);
    }
    .button-ip {
      width: 50px;
    }

    .setting-tip {
      font-size: 16px;
      color: red;
    }
  }

  .setting-button {
    // padding: 20px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
