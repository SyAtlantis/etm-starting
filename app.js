const { app, BrowserWindow } = require('electron');
const { fork } = require("child_process");
const path = require('path');

let mainWindow;

let createWindow = () => {

    mainWindow = new BrowserWindow({
        width: 600,
        height: 700,
        minWidth: 576,
        minHeight: 700,
        useContentSize: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('./publish/index.html');

    mainWindow.on('closed', () => {
        mainWindow = null
    });

    if (true) {
        // 用主进程与渲染进程处理是消息
        require(__dirname + "/server/ipcMain.js");
    }
    else {
        // 开启子进程启动服务来处理消息
        fork(__dirname + "/server/main.js", []);
    }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
