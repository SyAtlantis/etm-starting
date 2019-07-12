const axios = require('axios');
const File = require('./file');
const etmjslib = require('etm-js-lib');

let config = File.readConfig();
let port = config.port;
let BASEURL = `http://localhost:${port}/api`;

class Chain {

    static getPublicKey(secret) {
        let hash = etmjslib.lib.crypto.createHash("sha256").update(secret).digest();
        let publicKey = etmjslib.utils.ed.MakeKeypair(hash).publicKey.toString('hex');
        return publicKey;
    }

    static async getMinerInfo() {
        try {
            let secret = config.forging.secret[0];
            if (!secret) {
                throw Error("This miner did not set secret!");
            }

            let publicKey = this.getPublicKey(secret);
            let url = BASEURL + `/delegates/get?publicKey=${publicKey}`;
            return await axios.get(url);;
        } catch (err) {
            throw err;
        }
    }
    static async getStatus() {
        try {
            let url = BASEURL + `/blocks/getStatus`;
            return await axios.get("http://localhost:4096/api/blocks/getStatus");
        } catch (err) {
            throw err;
        }
    }

    static async getSyncInfo() {
        try {
            let url = BASEURL + '/loader/status/sync';
            return await axios.get(url);
        } catch (err) {
            throw err;
        }
    }

    static async getBlockInfo() {
        try {
            let secret = config.forging.secret[0];
            if (!secret) {
                throw Error("This miner did not set secret!");
            }

            let publicKey = this.getPublicKey(secret);
            // let publicKey = "330fce6558acfae682fd720295fbfb07434a2511048d3fa6497887aa3a9521e6"
            // let url = `http://20.188.242.113:${port}/api/delegates/get?publicKey=${publicKey}`;
            let url = BASEURL + `/delegates/get?publicKey=${publicKey}`;
            return await axios.get(url);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Chain;