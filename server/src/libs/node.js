const fs = require("fs");
const path = require("path");
const File = require("./file");
const Shell = require("./shell");

let appPath = File.getAppPath();

let assetsName = (() => {
    if (process.platform === "win32") {
        return "node_win.zip";
    } else if (process.platform === "linux") {
        return "node_linux.zip";
    } else if (process.platform === "darwin") {
        return "node_mac.zip";
    } else {
        throw Error(`Unsupported os[${process.platform}]`);
    }
})();

let srcPath = (() => {
    if (process.platform === "win32") {
        return path.resolve(appPath, "./node/runner.exe");
    } else if (process.platform === "linux") {
        return path.resolve(appPath, "./node/runner");
    } else if (process.platform === "darwin") {
        return path.resolve(appPath, "./node/runner");
    } else {
        throw Error(`Unsupported os[${process.platform}]`);
    }
})();

let dstPath = (() => {
    if (process.platform === "win32") {
        return path.resolve(path.join(process.env["SystemRoot"], "System32", "node.exe"));
    } else if (process.platform === "linux") {
        Shell.exec("whoami")
            .then(res => {
                return `/home/${res}/bin/node`;
            }).catch(err => {
                throw err;
            });
    } else if (process.platform === "darwin") {
        return "/usr/local/bin/node";
    } else {
        throw Error(`Unsupported os[${process.platform}]`);
    }
})();

class Node {

    static async getNodeVersion() {
        try {
            return await Shell.exec("node -v");
        } catch (err) {
            throw err;
        }
    }

    static async linkNode() {
        try {
            Shell.rm("-rf", path.join(appPath, "node"));
            await File.installDepend(assetsName, appPath);

            Shell.rm("-rf", dstPath);
            return await Shell.ln("-sf", srcPath, dstPath);
        } catch (err) {
            throw err;
        }
    }

    static async unlinkNode() {
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

module.exports = Node;