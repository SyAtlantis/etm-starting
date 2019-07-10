"use strict";

const File = require('../libs/file');


let getVulue = async ctx => {
    try {
        let configJson = File.readConfig();

        ctx.body = {
            success: true,
            results: {
                port: configJson.port,
                publicIp: configJson.publicIp,
                secret: configJson.forging.secret[0],
                magic: configJson.magic,
                peers: configJson.peers.list,
            }
        };
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

let setVulue = async ctx => {
    try {
        let { params } = ctx.request.body;

        let configJson = File.readConfig();

        configJson.port = params.port;
        configJson.peerPort = (parseInt(params.port) + 1).toString();
        configJson.publicIp = params.publicIp;
        configJson.forging.secret = [params.secret];
        configJson.magic = params.magic;
        configJson.peers.list = JSON.parse(params.peers);

        File.writeConfig(configJson);

        ctx.body = {
            success: true,
            results: "setting data ok"
        };
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

module.exports = (router) => {
    router.get("/setting/getVulue", getVulue);
    router.post("/setting/setVulue", setVulue);
};