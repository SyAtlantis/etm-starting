import Server from "./server";

let server = new Server();

class Depand {

  static async getPlatform(data) {
    return await server.get("/depend/getPlatform", data);
  }

  static async getEtmInfo(data) {
    return await server.get("/depend/getEtmInfo", data);
  }

  static async getNodeInfo(data) {
    return await server.get("/depend/getNodeInfo", data);
  }

  static async getPm2Info(data) {
    return await server.get("/depend/getPm2Info", data);
  }

  static async installEtm(data) {
    return await server.put("/depend/installEtm", data);
  }

  static async installNode(data) {
    return await server.put("/depend/installNode", data);
  }

  static async installPm2(data) {
    return await server.put("/depend/installPm2", data);
  }

  static async uninstallEtm(data) {
    return await server.put("/depend/uninstallEtm", data);
  }

  static async uninstallNode(data) {
    return await server.put("/depend/uninstallNode", data);
  }

  static async uninstallPm2(data) {
    return await server.put("/depend/uninstallPm2", data);
  }

}

export default Depand;