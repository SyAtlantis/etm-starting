"use strict";

const node = require('../libs/node');
const pm2 = require('../libs/pm2');
const etm = require('../libs/etm');

let getPlatform = async ctx => {
    try {
        let res = process.platform;
        ctx.body = {
            success: true,
            results: res
        };
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let getNodeInfo = async ctx => {
    try {
        let res = await node.getNodeVersion();
        ctx.body = {
            success: true,
            results: res
        };
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let getPm2Info = async ctx => {
    try {
        let res = await pm2.getPm2Version();
        // console.log("getPm2Info======1========>", res, typeof res)
        if ((typeof res) === 'string' && res.length > 20) {
            res = await pm2.getPm2Version();
            // console.log("getPm2Info======2========>", res, typeof res)
        }
        ctx.body = {
            success: true,
            results: res
        };
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let getEtmInfo = async ctx => {
    try {
        let res = await etm.getEtmVersion();
        ctx.body = {
            success: true,
            results: res
        };
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let installNode = async ctx => {
    try {
        let res = await node.linkNode();
        ctx.body = {
            success: true,
            results: res
        };
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let installPm2 = async ctx => {
    try {
        let res = await pm2.linkPm2();
        ctx.body = {
            success: true,
            results: res
        };
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let installEtm = async ctx => {
    try {
        let res = await etm.installEtm();
        ctx.body = {
            success: true,
            results: res
        };
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let uninstallNode = async ctx => {
    try {
        let res = await node.unlinkNode();
        ctx.body = {
            success: true,
            results: res
        };
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let uninstallPm2 = async ctx => {
    try {
        let res = await pm2.unlinkPm2();
        ctx.body = {
            success: true,
            results: res
        };
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let uninstallEtm = async ctx => {
    try {
        let res = await etm.unistallEtm();
        ctx.body = {
            success: true,
            results: res
        };
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

module.exports = (router) => {

    router.get("/depend/getPlatform", getPlatform);

    router.get("/depend/getNodeInfo", getNodeInfo);
    router.get("/depend/getPm2Info", getPm2Info);
    router.get("/depend/getEtmInfo", getEtmInfo);

    router.put("/depend/installNode", installNode);
    router.put("/depend/installPm2", installPm2);
    router.put("/depend/installEtm", installEtm);

    router.put("/depend/uninstallNode", uninstallNode);
    router.put("/depend/uninstallPm2", uninstallPm2);
    router.put("/depend/uninstallEtm", uninstallEtm);
};