"use strict";

const etm = require('../libs/etm');
const boot = require('../libs/boot');
const chain = require('../libs/chain');

let getMinerInfo = async ctx => {
    try {
        let res1 = await chain.getMinerInfo();
        let res2 = await chain.getStatus();
        if (res1.data && res1.data.delegate && res2.data) {
            let res = Object.assign({}, res1.data.delegate, res2.data)
            ctx.body = {
                success: true,
                results: res
            };
        }
        else {
            throw Error("The api can't get miner info!");
        }
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let getStatus = async ctx => {
    try {
        let res = await etm.getStatus();
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

let start = async ctx => {
    try {
        let res = await etm.start();
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

let stop = async ctx => {
    try {
        let res = await etm.stop();
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

let pause = async ctx => {
    try {
        let res = await etm.pause();
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

let restart = async ctx => {
    try {
        let res = await etm.restart();
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

let setBoot = async ctx => {
    try {
        let res = await boot.boot();
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

let setUnboot = async ctx => {
    try {
        let res = await boot.unboot();
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

let isboot = async ctx => {
    try {
        let res = await boot.isboot();
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
    router.get("/operate/getMinerInfo", getMinerInfo);
    router.get("/operate/getStatus", getStatus);

    router.put("/operate/start", start);
    router.put("/operate/stop", stop);
    router.put("/operate/pause", pause);
    router.put("/operate/redo", restart);

    router.put("/operate/boot", setBoot);
    router.put("/operate/unboot", setUnboot);
    router.get("/operate/isboot", isboot);
};