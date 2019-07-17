const fs = require("fs");
const path = require("path");
const File = require("./file");
const Shell = require("./shell");


const rootDir = File.getRootPath();
const nodeDir = path.resolve(path.join(rootDir, "build/node"));

let srcPath = (() => {
    if (process.platform === "win32") {
        return path.resolve(nodeDir, "./win32/runner.exe");
    } else if (process.platform === "linux") {
        return path.resolve(nodeDir, "./linux/runner");
    } else if (process.platform === "darwin") {
        return path.resolve(nodeDir, "./macos/runner");
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