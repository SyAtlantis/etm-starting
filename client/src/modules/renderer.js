
class Renderer {
    constructor(ipcRenderer) {
        this.ipcRenderer = ipcRenderer;
    }

    async get(uri, data) {
        this.ipcRenderer.send(uri, data);

        return new Promise((resolve, rejects) => {
            void (rejects);
            this.ipcRenderer.on(uri, (event, res) => {
                void (event);
                return resolve(res);
            });
        });
    }

    async post(uri, data) {
        this.ipcRenderer.send(uri, data);

        return new Promise((resolve, rejects) => {
            void (rejects);
            this.ipcRenderer.on(uri, (event, res) => {
                void (event);
                return resolve(res);
            });
        });
    }

    async put(uri, data) {
        this.ipcRenderer.send(uri, data);

        return new Promise((resolve, rejects) => {
            void (rejects);
            this.ipcRenderer.on(uri, (event, res) => {
                void (event);
                return resolve(res);
            });
        });
    }

}

export default Renderer;
