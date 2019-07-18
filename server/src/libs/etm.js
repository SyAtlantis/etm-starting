const File = require("./file");
const Shell = require("./shell");

const appPath = File.getAppPath();
const prjPath = File.getPrjPath();
const app = `${prjPath}/app.js`;
const appName = "entanmo";

let assetsName = (() => {
    if (process.platform === "win32") {
        return "etm_win.zip";
    } else if (process.platform === "linux") {
        return "etm_linux.zip";
    } else if (process.platform === "darwin") {
        return "etm_mac.zip";
    } else {
        throw Error(`Unsupported os[${process.platform}]`);
    }
})();

class Etm {

    static async getEtmVersion() {
        try {
            const packageJson = File.readPackage();
            let version = packageJson.version;
            return version;
        } catch (err) {
            throw err;
        }

    }

    static async installEtm() {
        try {
            return await File.installDepend(assetsName, appPath);
        } catch (err) {
            throw err;
        }
    }

    static async unistallEtm() {
        try {
            let prjPath = File.getPrjPath();
            Shell.rm("-f", prjPath);
        } catch (err) {
            throw err;
        }
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
                    throw Error("Not found status!");
                }
            } else {
                throw Error("pm2 jlist res not a string array!");
            }
        } catch (err) {
            throw err;
        }
    }


    static async start() {
        try {
            let command = `pm2 start "${app}" -n "${appName}" -- --base "${prjPath}"`;
            return await Shell.exec(command);
        } catch (err) {
            throw err;
        }
    }

    static async pause() {
        try {
            let command = `pm2 stop "${appName}"`;
            return await Shell.exec(command);
        } catch (err) {
            throw err;
        }
    }

    static async stop() {
        try {
            await this.pause();
            let command = `pm2 delete "${appName}"`;
            return await Shell.exec(command);
        } catch (err) {
            throw err;
        }
    }

    static async restart() {
        try {
            await this.pause();
            return await this.start();
            // let command = `pm2 restart ${appName}`;
            // return await Shell.exec(command);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Etm;