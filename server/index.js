const fs = require("fs");
const path = require("path");
const { ipcMain } = require('electron');

const apiDir = path.resolve(__dirname, "src", "api");
const APIs = fs.readdirSync(apiDir);
APIs.forEach(el => {
    if (el.endsWith(".js")) {
        const APIModule = require(path.resolve(apiDir, el));
        APIModule(ipcMain);
    }
});