const path = require("path");
const fs = require("fs");
const unzipper = require('unzipper');
const { app } = require('electron');

const rootPath = path.resolve(path.join(__dirname, "../../.."));

class File {

    //项目安装目录
    static getRootPath() {
        return rootPath;
    }

    //资源解压目录
    static getAppPath() {
        if (app != null) {//启动服务没有app
            return app.getPath("userData");
        }
        return rootPath;
    }

    //etm项目目录
    static getPrjPath() {
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

    static getRootPassword() {
        let passwordConf = path.join(this.getAppPath(), "password.conf");
        if (!fs.existsSync(passwordConf)) {
            fs.writeFileSync(passwordConf, "000");
        }

        let passwordFile = fs.readFileSync(passwordConf);
        let password = passwordFile.toString().trim();
        return password;
    }

    static setRootPassword(password) {
        let passwordConf = path.join(this.getAppPath(), "password.conf");
        fs.writeFileSync(passwordConf, password);
    }

}

module.exports = File;