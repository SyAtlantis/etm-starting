const fs = require("fs");
const path = require("path");
const File = require("./file");
const Shell = require("./shell");

let appPath = File.getAppPath();

let srcPath = (() => {
    if (process.platform === "win32") {
        return path.resolve(appPath, "./node/win32/runner.exe");
    } else if (process.platform === "linux") {
        return path.resolve(appPath, "./node/linux/runner");
    } else if (process.platform === "darwin") {
        return path.resolve(appPath, "./node/macos/runner");
    } else {
        throw Error(`Unsupported os[${process.platform}]`);
    }
})();

let dstPath = (() => {
    if (process.platform === "win32") {
        return path.resolve(path.join(process.env["SystemRoot"], "System32", "node.exe"));
    } else if (process.platform === "linux") {
        return "/usr/local/bin/node";
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
            Shell.rm("-f", dstPath);

            await File.installDepend("node.zip", appPath);

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