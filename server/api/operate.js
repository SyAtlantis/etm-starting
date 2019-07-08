"use strict";
const etm = require('../libs/etm');
const boot = require('../libs/boot');

let getStatus = async ctx => {
    try {
        await etm.getStatus()
            .then(res => {
                ctx.body = {
                    success: true,
                    results: res
                };
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let start = async ctx => {
    try {
        await etm.start()
            .then(res => {
                ctx.body = {
                    success: true,
                    results: res
                };
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let stop = async ctx => {
    try {
        await etm.stop()
            .then(res => {
                ctx.body = {
                    success: true,
                    results: res
                };
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let pause = async ctx => {
    try {
        await etm.pause()
            .then(res => {
                ctx.body = {
                    success: true,
                    results: res
                };
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let setBoot = async ctx => {
    try {
        await boot.boot()
            .then(res => {
                ctx.body = {
                    success: true,
                    results: res
                };
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let setUnboot = async ctx => {
    try {
        await boot.unboot()
            .then(res => {
                ctx.body = {
                    success: true,
                    results: res
                };
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let isboot = async ctx => {
    try {
        await boot.isboot()
            .then(res => {
                ctx.body = {
                    success: true,
                    results: res
                };
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

module.exports = (ipcMain) => {
    ipcMain.on("/operate/getStatus", (event, args) => {
        event.reply("/setting/setVulue", getStatus(args));
    });
    ipcMain.on("/operate/start", (event, args) => {
        event.reply("/setting/setVulue", start(args));
    });
    ipcMain.on("/operate/stop", (event, args) => {
        event.reply("/setting/setVulue", stop(args));
    });
    ipcMain.on("/operate/pause", (event, args) => {
        event.reply("/setting/setVulue", pause(args));
    });

    ipcMain.on("/operate/boot", (event, args) => {
        event.reply("/setting/setVulue", setBoot(args));
    });
    ipcMain.on("/operate/unboot", (event, args) => {
        event.reply("/setting/setVulue", setUnboot(args));
    });
    ipcMain.on("/operate/isboot", (event, args) => {
        event.reply("/setting/setVulue", isboot(args));
    });
};