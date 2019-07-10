const path = require("path");
const File = require("./file");
const Shell = require("./shell");

const rootDir = File.getRootPath();
const projDir = path.resolve(path.join(rootDir, "build/etm"));

const app = `${projDir}/app.js`;
const appName = "entanmo";

class Etm {

    static async getEtmVersion() {
        try {
            let packagePath = File.getPackagePath();
            const packageJson = require(packagePath);
            let version = packageJson.version;
            return version;
        } catch (err) {
            throw err;
        }

    }

    static async installEtm() {
    }

    static async unistallEtm() {
    }

    static async getStatus() {
        try {
            let command = `pm2 jlist`;
            let res = await Shell.exec(command);
            let resJson = JSON.parse(res);

            if (resJson instanceof Array) {
                let status;
                resJson.forEach(element => {
                    if (element.name === appName && element.pm2_env) {
                        status = element.pm2_env.status;
                    }
                });

                if (status) {
                    return status;
                }
                else {
                    throw ("Not found status!");
                }
            } else {
                throw ("pm2 jlist res not a string array!");
            }
        } catch (err) {
            throw err;
        }
    }


    static async start() {
        try {
            let command = `pm2 start ${app} -n ${appName} -- --base ${projDir}`;
            return await Shell.exec(command);
        } catch (err) {
            throw err;
        }
    }

    static async stop() {
        try {
            let command = `pm2 delete ${appName}`;
            return await Shell.exec(command);
        } catch (err) {
            throw err;
        }
    }

    static async pause() {
        try {
            let command = `pm2 stop ${appName}`;
            return await Shell.exec(command);
        } catch (err) {
            throw err;
        }
    }

    static async restart() {
        try {
            let command = `pm2 restart ${appName}`;
            return await Shell.exec(command);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Etm;