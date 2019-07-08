import Server from "./server";

let server = new Server();

class Control {

    static async getStatus(data) {
        return await server.get("/operate/getStatus", data);
    }

    static async start(data) {
        return await server.put("/operate/start", data);
    }

    static async stop(data) {
        return await server.put("/operate/stop", data);
    }

    static async pause(data) {
        return await server.put("/operate/pause", data);
    }

    static async boot(data) {
        return await server.put("/operate/boot", data);
    }

    static async unboot(data) {
        return await server.put("/operate/unboot", data);
    }

    static async isboot(data) {
        return await server.get("/operate/isboot", data);
    }

}

export default Control;