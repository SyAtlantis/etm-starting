const path = require("path");
const Registry = require("winreg");
const fs = require("fs");
const File = require("./file");

const appPath = File.getAppPath();
const prjPath = File.getPrjPath();

const app = `${prjPath}/app.js`;
const appName = "entanmo";
const deploy_command = `pm2 start "${app}" -n "${appName}" -- --base "${prjPath}"`;

const WINREG_REG_KEY = "ENTANMO";
const WINREG_REG_VALUE = path.resolve(path.join(appPath, "startup.cmd"));

const _winreg = () => {
    const RUN_LOCATION = "\\Software\\Microsoft\\Windows\\CurrentVersion\\Run";
    const winregInst = new Registry({
        hive: Registry.HKCU,
        key: RUN_LOCATION
    });
    return winregInst;
};

const _winreg_issetted = async () => {
    return new Promise((resolve, reject) => {
        const inst = _winreg();
        inst.valueExists(WINREG_REG_KEY, (err, result) => {
            if (err) {
                return reject(new Error(err.toString()));
            }

            return resolve(result);
        });
    });
};

const _winreg_set = async () => {
    return new Promise((resolve, reject) => {
        const inst = _winreg();
        inst.set(WINREG_REG_KEY, Registry.REG_SZ, WINREG_REG_VALUE, err => {
            if (err) {
                return reject(new Error(err.toString()));
            }
            return resolve(true);
        });
    });
};

const _winreg_unset = async () => {
    if (!(await _winreg_issetted())) {
        return true;
    }
    return new Promise((resolve, reject) => {
        const inst = _winreg();
        inst.remove(WINREG_REG_KEY, err => {
            if (err) {
                return reject(new Error(err.toString()));
            }

            return resolve(true);
        });
    });
};

const _prepare_startup_cmd = () => {
    const cwd = path.resolve(appPath, "../");
    const scripts = [
        `cmd /K`,
        `"cd ${cwd}`,
        "&&",
        deploy_command,
        "&&",
        `pm2 logs ${appName}"`,
    ];
    const cmd = scripts.join(" ");

    fs.writeFileSync(WINREG_REG_VALUE, cmd);
    if (fs.existsSync(WINREG_REG_VALUE)) {
        return true;
    }
    return false;
};

const _startup_win32 = async () => {
    if (!_prepare_startup_cmd()) {
        throw Error(`Prepare startup script failure, maybe use administrator.`);
    }

    try {
        if (await _winreg_issetted()) {
            await _winreg_unset();
        }

        await _winreg_set();
        return true;
    } catch (error) {
        throw new Error(error.toString());
    }
};

const _startup_linux = async () => {
    return new Promise((resolve, reject) => {
        shelljs.exec("pm2 save", { silent: true }, (code, stdout, stderr) => {
            void (stdout);
            if (code !== 0) {
                return reject(new Error(stderr.toString()));
            }

            shelljs.exec("pm2 startup", { silent: true }, (code, stdout, stderr) => {
                if (code === 0) {
                    return resolve(true);
                } else if (code === 1) {
                    const stdoutArray = stdout.split(/[\r|\n|\r\n]/);
                    let extraCmd = stdoutArray.pop().trim();
                    extraCmd = extraCmd === "" ? stdoutArray.pop() : extraCmd;
                    console.log("[Startup] To setup the Startup Script, copy/paste the following command once:\n"
                        + colorWarning(extraCmd));
                    return resolve(true);
                } else {
                    return reject(new Error(stderr.toString()));
                }
            });
        });
    });
};

const _unstartup_win32 = async () => {
    try {
        if (await _winreg_issetted()) {
            await _winreg_unset();
        }
        return true;
    } catch (error) {
        throw new Error(error.toString());
    }
};

const _unstartup_linux = async () => {
    return new Promise((resolve, reject) => {
        shelljs.exec("pm2 unstartup", { silent: true }, (code, stdout, stderr) => {
            if (code === 0) {
                return resolve(true);
            } else if (code === 1) {
                const stdoutArray = stdout.split(/[\r|\n|\r\n]/);
                let extraCmd = stdoutArray.pop().trim();
                extraCmd = extraCmd === "" ? stdoutArray.pop() : extraCmd;
                console.log("[Unstartup] To setup the Startup Script, copy/paste the following command once:\n"
                    + colorWarning(extraCmd));
                return resolve(true);
            } else {
                return reject(new Error(stderr.toString()));
            }
        });
    });
};


class Boot {

    static async boot() {
        if (process.platform === "win32") {
            return await _startup_win32();
        } else if (process.platform === "linux") {
            return await _startup_linux();
        } else if (process.platform === "darwin") {
            return await _startup_linux();
        } else {
            throw Error(`Unsupported os[${process.platform}]`);
        }
    }

    static async unboot() {
        if (process.platform === "win32") {
            return await _unstartup_win32();
        } else if (process.platform === "linux") {
            return await _unstartup_linux();
        } else if (process.platform === "darwin") {
            return await _unstartup_linux();
        } else {
            throw Error(`Unsupported os[${process.platform}]`);
        }
    }

    static async isboot() {
        return await _winreg_issetted();
    }

}

module.exports = Boot;