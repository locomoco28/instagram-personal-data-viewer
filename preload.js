const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const fs = require('fs');

require('./front/materialize/js/materialize.min.js');

window.addEventListener(
    'DOMContentLoaded',
    function() {
        window.getFileData = async files => {
            const data = await ipcRenderer.invoke('unzip files', files);
            /**
            await fs.writeFile(
                'C:\\Users\\Eren\\Desktop\\tmp.txt',
                JSON.stringify(data),
                err => {
                    M.toast({ html: err });
                }
            );
            /**/

            // display files
            //console.log(JSON.stringify(data).length);
            return data;
        };
        /*
        document.getElementById('f').addEventListener('change', function(e) {
            e.preventDefault();
            var files = e.target.files;
            var data = [];
            var err = '';
            for (var i = 0; i < files.length; i++) {
                var ext = /\.[0-9a-z]+$/i.exec(files[i].name);
                if (ext == '.zip') data.push(files[i].path);
                else
                    err += `File "${files[i].name}" has an invalid format ("${ext}" instead of ".zip")<br/>`;
            }
            if (err != '') {
                M.toast({ html: err, classes: 'error', displayLength: 16000 });
            }
            if (data.length > 0) {
                getFileData(data);
            } else {
                M.toast({
                    html: 'No valid files were passed',
                    classes: 'error',
                    displayLength: 16000
                });
            }
        });
        */
    },
    false
);

ipcRenderer.on('error', err => {
    M.toast({ html: err, classes: 'error' });
    console.log('ipc Error: ', err);
});
