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

        let port = parseInt(params.port);
        let peerList = JSON.parse(params.peers);

        configJson.port = port.toString();
        configJson.peerPort = (port + 1).toString();
        configJson.publicIp = params.publicIp;
        configJson.forging.secret = [params.secret];
        configJson.magic = params.magic;
        configJson.peers.list = peerList;

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

let setPassword = async ctx => {
    try {
        let { params } = ctx.request.body;
        console.log(params)
        File.setRootPassword(params.password);
        console.log(`echo "${File.getRootPassword()}" | sudo -S rm -rf `)
        ctx.body = {
            success: true,
            results: "setting password ok"
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
    router.post("/setting/setPassword", setPassword);
};