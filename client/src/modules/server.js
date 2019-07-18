import Axios from "axios";
import Renderer from "./renderer";

const ipcRenderer = window.electronIpcRenderer;

class Server {
  constructor() {
    if (ipcRenderer) {
      this.$ajax = new Renderer(ipcRenderer);
    }
    else {
      this.$ajax = Axios.create({
        baseURL: 'http://localhost:7788',
        timeout: "6000",
        headers: {
          "X-Custom-Header": "foobar"
        }
      });
    }
    console.log(this.$ajax);
  }

  async get(uri, data) {
    return await this.$ajax.get(uri, { params: data });
  }

  async post(uri, data) {
    return await this.$ajax.post(uri, { params: data });
  }

  async put(uri, data) {
    return await this.$ajax.put(uri, { params: data });
  }
}

export default Server;