"use strict";

const etm = require('../libs/etm');
const boot = require('../libs/boot');
const chain = require('../libs/chain');

let getMinerInfo = async ctx => {
    try {
        await chain.getMinerInfo()
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

let restart = async ctx => {
    try {
        await etm.restart()
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