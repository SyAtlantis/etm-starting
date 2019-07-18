const path = require("path");
const fs = require("fs");
const unzipper = require('unzipper');
const { app } = require('electron');

const rootPath = path.resolve(path.join(__dirname, "../../.."));

class File {

    static getRootPath() {//项目安装目录
        return rootPath;
    }

    static getAppPath() {//资源解压目录
        return app.getPath("userData");
    }

    static getPrjPath() {//etm项目目录
        return path.join(this.getAppPath(), "etm");
    }

    static readConfig() {
        let configPath = path.join(this.getPrjPath(), "config/config.json");
        let config = fs.readFileSync(configPath);
        let configJson = JSON.parse(config);

        return configJson;
    }

    static writeConfig(configJson) {
        let configPath = path.join(this.getPrjPath(), "config/config.json");
        fs.writeFileSync(configPath, JSON.stringify(configJson, null, 2));
    }

    static readPackage() {
        let packagePath = path.join(this.getPrjPath(), "package.json");
        let packageFile = fs.readFileSync(packagePath);
        let packageJson = JSON.parse(packageFile);

        return packageJson;
    }

    static async installDepend(resource, appPath) {
        let srcPath = path.join(rootPath, "assets", resource);
        let readStream = fs.createReadStream(srcPath);

        return new Promise((resolve, reject) => {
            readStream.pipe(unzipper.Extract({ path: appPath }))
                .on("finish", () => {
                    console.log("resolve")
                    resolve("install finish");
                })
                .on("error", err => {
                    console.log("reject")
                    reject(err);
                })
        })

    }

}

module.exports = File;