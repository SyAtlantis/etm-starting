

class Renderer {
    constructor(ipcRenderer) {
        this.ipcRenderer = ipcRenderer;
    }

    async get(uri, data) {
        this.ipcRenderer.send(uri, data);

        this.ipcRenderer.on(uri, (event, res) => {
            return res;
        });
    }

    async post(uri, data) {
        this.ipcRenderer.send(uri, data);

        this.ipcRenderer.on(uri, (event, res) => {
            return res;
        });
    }

    async put(uri, data) {
        this.ipcRenderer.send(uri, data);

        this.ipcRenderer.on(uri, (event, res) => {
            return res;
        });
    }

}

export default Renderer;
