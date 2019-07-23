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
        return path.resolve(appPath, "./node/node_win.exe");
    } else if (process.platform === "linux") {
        return path.resolve(appPath, "./node/node_linux");
    } else if (process.platform === "darwin") {
        return path.resolve(appPath, "./node/node_mac");
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
            Shell.rm("-rf", path.join(appPath, "node"));
            await File.installDepend(assetsName, appPath);

            if (process.platform === "win32") {
                Shell.rm("-rf", dstPath);
                return await Shell.ln("-sf", srcPath, dstPath);
            }
            else {
                let password = File.getRootPassword();
                let command1 = `echo "${password}" | sudo -S rm -rf "${dstPath}"`;
                await Shell.exec(command1);

                let command2 = `chmod a+x "${srcPath}"`;
                await Shell.exec(command2);

                let command3 = `echo "${password}" | sudo -S ln -s "${srcPath}" "${dstPath}"`;
                return await Shell.exec(command3);
            }
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