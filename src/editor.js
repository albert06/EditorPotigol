var {app,Menu,dialog}   =   require('electron').remote;
var fs                  =   require('fs');

var currentWindow       =   require('electron').remote.getCurrentWindow();
var JavaScriptMode      =   ace.require('ace/mode/javascript').Mode;
var PotigolMode         =   ace.require('ace/mode/potigol').Mode;
var PhpMode             =   ace.require('ace/mode/php').Mode;
var editorInstance      =   ace.edit('editor');

editorInstance.getSession().setMode(new PhpMode());
editorInstance.setTheme('ace/theme/twilight');

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
            label: 'PHP',
            click: function(){editorInstance.getSession().setMode(new PhpMode())}
        },{
            label: 'Potigol',
            click: function(){editorInstance.getSession().setMode(new PotigolMode())}
        },{
            label: 'JavaScript',
            click: function(){editorInstance.getSession().setMode(new JavaScriptMode())}
        }]
    },{
        label: 'Temas',
        submenu: [{
            label: 'monokai',
            click: function(){editorInstance.setTheme('ace/theme/monokai')}
        },{
            label: 'twilight',
            click: function(){editorInstance.setTheme('ace/theme/twilight')}
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

function saveHandler () {
    var fileName = dialog.showSaveDialog(currentWindow);
    
    if (fileName !== undefined) {
        fs.writeFile(fileName, editorInstance.getValue());
    }
}