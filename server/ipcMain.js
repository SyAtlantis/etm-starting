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
            };
            func(ctx)
                .then(() => {
                    event.reply(url, { data: ctx.body, status: 200 });
                }).catch(() => {
                    event.reply(url, { data: ctx.body, status: 200 });
                });
        });
    }

    async post(url, func) {
        ipcMain.on(url, (event, arg) => {
            let ctx = {
                request: {
                    body: arg
                }
            };
            func(ctx)
                .then(() => {
                    event.reply(url, { data: ctx.body, status: 200 });
                }).catch(() => {
                    event.reply(url, { data: ctx.body, status: 200 });
                });
        });
    }

    async put(url, func) {
        ipcMain.on(url, (event, arg) => {
            let ctx = {
                request: {
                    body: arg
                }
            };
            func(ctx)
                .then(() => {
                    event.reply(url, { data: ctx.body, status: 200 });
                }).catch(() => {
                    event.reply(url, { data: ctx.body, status: 200 });
                });
        });
    }
}

main();