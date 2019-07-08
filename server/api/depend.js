"use strict";

const node = require('../libs/node');
const pm2 = require('../libs/pm2');
const etm = require('../libs/etm');

let getNodeInfo = async ctx => {
    try {
        await node.getNodeVersion()
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

let getPm2Info = async ctx => {
    try {
        await pm2.getPm2Version()
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

let getEtmInfo = async ctx => {
    try {
        await etm.getEtmVersion()
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

let installNode = async ctx => {
    try {
        await node.linkNode()
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

let installPm2 = async ctx => {
    try {
        await pm2.linkPm2()
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

let installEtm = async ctx => {
    try {
        await etm.installEtm()
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

let uninstallNode = async ctx => {
    try {
        await node.unlinkNode()
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

let uninstallPm2 = async ctx => {
    try {
        await pm2.unlinkPm2()
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

let uninstallEtm = async ctx => {
    try {
        await etm.unistallEtm()
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
    ipcMain.on("/depend/getNodeInfo", (event, args) => {
        event.reply("/setting/setVulue", getNodeInfo(args));
    });
    ipcMain.on("/depend/getPm2Info", (event, args) => {
        event.reply("/setting/setVulue", getPm2Info(args));
    });
    ipcMain.on("/depend/getEtmInfo", (event, args) => {
        event.reply("/setting/setVulue", getEtmInfo(args));
    });

    ipcMain.on("/depend/installNode", (event, args) => {
        event.reply("/setting/setVulue", installNode(args));
    });
    ipcMain.on("/depend/installPm2", (event, args) => {
        event.reply("/setting/setVulue", installPm2(args));
    });
    ipcMain.on("/depend/installEtm", (event, args) => {
        event.reply("/setting/setVulue", installEtm(args));
    });

    ipcMain.on("/depend/uninstallNode", (event, args) => {
        event.reply("/setting/setVulue", uninstallNode(args));
    });
    ipcMain.on("/depend/uninstallPm2", (event, args) => {
        event.reply("/setting/setVulue", uninstallPm2(args));
    });
    ipcMain.on("/depend/uninstallEtm", (event, args) => {
        event.reply("/setting/setVulue", uninstallEtm(args));
    });
};