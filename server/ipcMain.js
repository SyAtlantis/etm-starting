const fs = require("fs");
const path = require("path");
const { ipcMain } = require('electron');

function main() {
    const apiDir = path.resolve(__dirname, "src", "api");
    const APIs = fs.readdirSync(apiDir);
    const router = new Router();
    APIs.forEach(el => {
        if (el.endsWith(".js")) {
            const APIModule = require(path.resolve(apiDir, el));
            APIModule(router);
        }
    });
}

class Router {
    async get(url, func) {
        ipcMain.on(url, (event, arg) => {
            let ctx = {
                request: {
                    body: arg
                }
            }
            await func(ctx);
            event.reply(url, ctx);
        });
    }

    async post() {
        ipcMain.on(url, (event, arg) => {
            let ctx = {
                request: {
                    body: arg
                }
            }
            await func(ctx);
            event.reply(url, ctx);
        });
    }

    async put() {
        ipcMain.on(url, (event, arg) => {
            let ctx = {
                request: {
                    body: arg
                }
            }
            await func(ctx);
            event.reply(url, ctx);
        });
    }
}

main();