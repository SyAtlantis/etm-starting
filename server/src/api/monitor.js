"use strict";

const axios = require('axios');
const si = require('systeminformation');
const etm = require('../libs/etm');
const chain = require('../libs/chain');

let getNetInfo = async ctx => {
    try {
        await axios.get('http://ip-api.com/json/')
            .then(res => {
                // console.log(res.data.query);
                if (res.data && res.data.query) {
                    let netInfo = {
                        publicIp: res.data.query
                    }

                    ctx.body = {
                        success: true,
                        results: netInfo
                    };
                }
                else {
                    throw new Error("The api can't get publicIp!");
                }
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
};

let getGpuInfo = async ctx => {
    try {
        await si.graphics()
            .then(res => {
                // console.log(res.controllers);
                ctx.body = {
                    success: true,
                    results: res.controllers
                };
            })
            .catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
};

let getProcInfo = async ctx => {
    try {
        await etm.getStatus()
            .then(res => {
                ctx.body = {
                    success: true,
                    results: { status: res }
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
};

let getSyncInfo = async ctx => {
    try {
        await chain.getSyncInfo()
            .then(res => {
                // console.log(res);
                if (res.data && res.data.success) {

                    ctx.body = {
                        success: true,
                        results: res.data
                    };
                }
                else {
                    throw new Error(res.data.error);
                }
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
};

let getBlockInfo = async ctx => {
    try {
        await chain.getBlockInfo()
            .then(res => {
                // console.log(res);
                if (res.data && res.data.success) {

                    ctx.body = {
                        success: true,
                        results: res.data.delegate
                    };
                }
                else {
                    throw res.data.error;
                }
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
};

module.exports = (router) => {
    router.get("/monitor/getNetInfo", getNetInfo);
    router.get("/monitor/getGpuInfo", getGpuInfo);
    router.get("/monitor/getProcInfo", getProcInfo);
    router.get("/monitor/getSyncInfo", getSyncInfo);
    router.get("/monitor/getBlockInfo", getBlockInfo);
};