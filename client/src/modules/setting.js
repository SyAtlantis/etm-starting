import Server from "./server";

let server = new Server();

class Setting {

    static async getVulue(data) {
        return await server.get("/setting/getVulue", data);
    }

    static async setVulue(data) {
        return await server.post("/setting/setVulue", data);
    }
}

export default Setting;