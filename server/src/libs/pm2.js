const fs = require("fs");
const path = require("path");
const File = require("./file");
const Shell = require("./shell");

let appPath = File.getAppPath();

let srcPath = (() => {
    if (process.platform === "win32") {
        return path.join(appPath, "pm2/pm2.cmd");
    } else if (process.platform === "linux") {
        return path.join(appPath, "pm2/node_modules/.bin/pm2");
    } else if (process.platform === "darwin") {
        return path.join(appPath, "pm2/node_modules/.bin/pm2");
    } else {
        throw Error(`Unsupported os[${process.platform}]`);
    }
})();

let dstPath = (() => {
    if (process.platform === "win32") {
        return path.resolve(path.join(process.env["SystemRoot"], "System32", "pm2.cmd"));
    } else if (process.platform === "linux") {
        Shell.exec("whoami")
            .then(res => {
                return `/home/${res}/bin/pm2`;
            }).catch(err => {
                throw err;
            });
    } else if (process.platform === "darwin") {
        return "/usr/local/bin/pm2";
    } else {
        throw Error(`Unsupported os[${process.platform}]`);
    }
})();


class Pm2 {

    static async getPm2Version() {
        try {
            return await Shell.exec("pm2 -v");
        } catch (err) {
            throw err;
        }
    }

    static async linkPm2() {
        try {
            Shell.rm("-rf", path.join(appPath, "pm2"));
            await File.installDepend("pm2.zip", appPath);

            // windows通过自定义全新cmd文件的方式来进行安装
            if (process.platform === "win32") {
                if (!fs.existsSync(srcPath)) {
                    const pm2_command_path = path.join(appPath, "pm2", "node_modules", "pm2", "bin", "pm2");
                    const commands = [
                        "@ECHO OFF",
                        "@SETLOCAL",
                        "@SET PATHEXT=%PATHEXT:;.JS;=;%",
                        `node "${path.resolve(pm2_command_path)}" %*`
                    ];
                    fs.writeFileSync(srcPath, commands.join("\r\n"));
                    if (!fs.existsSync(srcPath)) {
                        throw Error("Create pm2 command failure.");
                    }
                }
            }

            Shell.rm("-rf", dstPath);
            return await Shell.ln("-sf", srcPath, dstPath);
        } catch (err) {
            throw err;
        }
    }

    static async unlinkPm2() {
        return new Promise((resolve, reject) => {
            try {
                fs.unlinkSync(dstPath);
                return resolve(true);
            } catch (err) {
                return reject(new Error(err.toString()));
            }
        });
    }


}

module.exports = Pm2;