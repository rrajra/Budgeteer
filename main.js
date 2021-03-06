// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const jetpack = require('fs-jetpack');
const { exists } = require('fs-jetpack');
const { fstat, appendFileSync, fsync } = require('fs');
const { parseJSON } = require('jquery');
const { autoUpdater } = require('electron-updater');
const ipcMain = require('electron').ipcMain;


var yesno;
var img_dir = '/images/';

var mainjsIncome;
var mainjsAllowance;
var mainjsBills;


function createWindow () {0
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(__dirname, img_dir, 'money.ico'),
    titleBarStyle: 'customButtonsOnHover',
    frame: false,
    backgroundColor: 'black',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'menuHandler.js'),
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.on('close', function() { //   <---- Catch close event
});

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

function readFile() {
  const fs = require('fs');
  var userData = fs.readFile(__dirname + "\\data.json", 'utf8', function (err, data) {
    
    console.log("data is " + data);
    var parsed = JSON.parse(data);
    console.log(parsed.income);
    mainjsIncome = parsed.income;
    mainjsAllowance = parsed.allowance;
    mainjsBills = parsed.bills;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  var file = __dirname + "\\data.json"

        exists(file);
        yesno = exists(file);
        console.log(yesno);

        if(yesno == "file") {
            console.log("Works");
            readFile();
        }
        else {
            console.log("not working");
            console.log(file.exists);
            console.log(file);
        }


  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});