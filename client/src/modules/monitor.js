import Server from "./server";

let server = new Server();

class Monitor {

  static async getNetInfo(data) {
    return await server.get("/monitor/getNetInfo", data);
  }

  static async getGpuInfo(data) {
    return await server.get("/monitor/getGpuInfo", data);
  }

  static async getProcInfo(data) {
    return await server.get("/monitor/getProcInfo", data);
  }

  static async getSyncInfo(data) {
    return await server.get("/monitor/getSyncInfo", data);
  }

  static async getBlockInfo(data) {
    return await server.get("/monitor/getBlockInfo", data);
  }
}

export default Monitor;