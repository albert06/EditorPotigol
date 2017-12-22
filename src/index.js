const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url')


app.on('ready', function () {
    var mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: "PotigolEditor",
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
});

app.on('window-all-closed', function () {
  app.quit();
});
