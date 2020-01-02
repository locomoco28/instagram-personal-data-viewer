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
                label: 'Dark Mode',
                type: 'checkbox'
            },
            {
                label: 'High Contrast',
                type: 'checkbox'
            },
            {
                label: 'Fullscreen',
                role: 'togglefullscreen'
            }
        ]
    },

    {
        label: 'Fenster',
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
        label: 'Über',
        role: 'help',
        submenu: [
            {
                label: 'Mehr Erfahren',
                click(item, focusedWindow) {
                    focusedWindow.webContents.console.log('Hello World');
                }
            }
        ]
    }
];
