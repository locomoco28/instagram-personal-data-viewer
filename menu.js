const electron = require('electron');

module.exports = [
    {
        label: 'View',
        submenu: [
            {
                label: 'Zoom',
                submenu: [
                    {
                        label: 'Reset Zoom',
                        role: 'resetzoom'
                    },
                    {
                        label: 'Zoom In',
                        role: 'zoomin'
                    },
                    {
                        label: 'Zoom Out',
                        role: 'zoomout'
                    }
                ]
            },
            {
                label: 'Find In Page (Ctrl+F)',
                accelerator: 'CmdOrCtrl+F',
                click(item, focusedWindow) {
                    focusedWindow.webContents.send('find-cmd-triggered');
                }
            },
            {
                label: 'Fullscreen',
                role: 'togglefullscreen'
            }
        ]
    },

    {
        role: 'window',
        submenu: [
            {
                label: 'Minimieren',
                role: 'minimize'
            },
            {
                label: 'Schließen',
                role: 'close'
            },
            {
                label: 'Neuladen',
                role: 'reload'
            },
            {
                type: 'separator'
            },
            {
                label: 'Entwicklerwerkzeuge anzeigen',
                role: 'toggledevtools'
            }
        ]
    },

    {
        role: 'help',
        submenu: [
            {
                label: 'Find out more',
                click(item, focusedWindow) {
                    focusedWindow.webContents.console.log('Hello World');
                }
            }
        ]
    }
];
