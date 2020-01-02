const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const admZip = require('adm-zip');
const path = require('path');
const fs = require('fs');

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
        nodeIntegrationInWorker: false,
        preload: path.join(__dirname, 'preload.js')
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

ipcMain.handle('unzip files', (e, files) => {
    userData = {};
    dataToExtract = [
        //"checkout.json", // payment methods
        'comments.json',
        'connections.json' /* blocked/restricted users, close friends, sent friend requests, followers, following ppl & hashtags */,
        'contacts.json', // saved phone contacts
        'messages.json', // your chats
        'profile.json', // your bio, username, dp/pfp etc.
        'saved.json' // saved posts
        // TODO for later: media.json contains path's to images.
        //                 These have to be replaced by data uris
        //                 or sth from the actual image files.
        //                 part 3 and above are for media
        //"media.json", // sent media
    ];
    if (files.length > 0) {
        files.forEach(file => {
            if (fs.existsSync(file)) {
                var zip = new admZip(file);
                var entries = zip.getEntries();
                entries.forEach(entry => {
                    var ext = /\.[0-9a-z]+$/i.exec(entry.entryName);
                    if (
                        ext == '.json' &&
                        dataToExtract.indexOf(entry.entryName) > -1
                    ) {
                        userData[entry.entryName] = entry
                            .getData()
                            .toString('utf8');
                    }
                });
            }
        });
    } else {
        return { ok: false, error: 'missing files', files: files };
    }
    userData['ok'] = true;
    return userData;
});
