var {app,Menu,dialog}   =   require('electron').remote;
var fs                  =   require('fs');

var currentWindow       =   require('electron').remote.getCurrentWindow();
var JavaScriptMode      =   ace.require('ace/mode/javascript').Mode;
var PotigolMode         =   ace.require('ace/mode/potigol').Mode;
var editorInstance      =   ace.edit('editor');

editorInstance.session.setMode(new JavaScriptMode());

var mainMenu = Menu.buildFromTemplate([
    {
        label: 'Arquivo',
        submenu: [{
            label: 'Open',
            click: openHandler
        }, {
            label: 'Save As',
            click: saveHandler
        }]    
    },{
        label: 'Console',
        click: currentWindow.openDevTools
    },{
        label: 'Linguagens',
        submenu: [{
            label: 'Potigol',
            click: setPotigol
        },{
            label: 'JavaScript',
            click: setJavaScript
        }]
    }
]);
Menu.setApplicationMenu(mainMenu);

function openHandler () {
    var fileNames = dialog.showOpenDialog(currentWindow);
    
    if (fileNames !== undefined) {
        var fileName = fileNames[0];
        fs.readFile(fileName, 'utf8', function (err, data) {
            editorInstance.setValue(data);
        });
    }
}

function setJavaScript(){
    editorInstance.session.setMode(new JavaScriptMode());
}

function setPotigol(){
    editorInstance.session.setMode(new PotigolMode());
}

function saveHandler () {
    var fileName = dialog.showSaveDialog(currentWindow);
    
    if (fileName !== undefined) {
        fs.writeFile(fileName, editorInstance.getValue());
    }
}

editorInstance.setTheme('ace/theme/twilight');
