import Axios from "axios";

// const ipcRenderer = window.electronIpcRenderer;

class Server {
  constructor() {
    this.$ajax = Axios.create({
      baseURL: 'http://localhost:7788',
      timeout: "6000",
      headers: {
        "X-Custom-Header": "foobar"
      }
    });
  }

  async get(uri, data) {
    // if (ipcRenderer) {
    //   ipcRenderer.send(uri, { params: data });
    //   ipcRenderer.on(uri, (event, res) => {
    //     return res;
    //   });
    // }
    // else {
    return await this.$ajax.get(uri, { params: data });
    // }
  }

  async post(uri, data) {
    // if (ipcRenderer) {
    //   ipcRenderer.send(uri, { params: data });
    //   ipcRenderer.on(uri, (event, res) => {
    //     return res;
    //   });
    // }
    // else {
    return await this.$ajax.post(uri, { params: data });
    // }
  }

  async put(uri, data) {
    // if (ipcRenderer) {
    //   ipcRenderer.send(uri, { params: data });
    //   ipcRenderer.on(uri, (event, res) => {
    //     return res;
    //   });
    // }
    // else {
    return await this.$ajax.put(uri, { params: data });
    // }
  }
}

export default Server;