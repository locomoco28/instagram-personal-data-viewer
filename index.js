const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let window;

var winConfig = {
    minWidth: 1120,
    minHeight: 800,
    resizable: true,
    minWidth: 800,
    minHeight: 600,
    frame: true,
    transparent: false,
    title: 'Insta personal data viewer',
    webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: false // , preload: path.join(__dirname, "preload.js")
    }
};

app.on('ready', () => {
    window = new BrowserWindow(winConfig);
    window.hide();
    window.on('closed', () => {
        app.quit();
    });
    window.loadURL(`file://${path.join(__dirname, './front/index.html')}`);
    Menu.setApplicationMenu(Menu.buildFromTemplate(require('./menu.js')));
    //Menu.setApplicationMenu(null);

    window.show();
});

app.on('window-all-closed', () => {
    app.quit();
});
