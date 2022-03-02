const electron = require('electron');
const app = electron.app;
const Store = require('electron-store');
const store = new Store();
const BrowserWindow = electron.BrowserWindow;

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {

  app.quit();
  
}else{

  app.on('ready', () => {

    require('child_process').exec('java -version', (err, stdout, stderr) => {

          //_______Index______
    const expressIndex = require("express");
    const exIndex  = expressIndex();
    var httpIndex = require('http').createServer(exIndex);

    httpIndex.listen(8000, function () {
      console.log('index hosting start');
    });

    //_______window______
    const expressWindow = require("express");
    const exWindow  = expressWindow();
    var httpWindow = require('http').createServer(exWindow);

    httpWindow.listen(8080, function () {
      console.log('window hosting start');
    });

    //____window_rooting__

    exWindow.get("/img/:num", (req, res) =>{
      console.log(req.url);
      res.sendFile(`${__dirname}/window/`+req.url+``);
          console.log("画像読み込み");
    });

    exWindow.get("/", (req, res) =>{
      res.sendFile(`${__dirname}/window/window.html`);
        console.log("window html to access");
    });

    exWindow.get("/window.js", (req, res) =>{
      res.sendFile(`${__dirname}/window/window.js`);
        console.log("window js to acsess");
    });
    exWindow.get("/window.css", (req, res) =>{
      res.sendFile(`${__dirname}/window/window.css`);
        console.log("window css js to acsess");
    });
    exWindow.get("/long-press.js", (req, res) =>{
      res.sendFile(`${__dirname}/window/long-press.js`);
        console.log("window css js to acsess");
    });


    //____Index_rooting__
    exIndex.get("/", (req, res) =>{
      res.sendFile(`${__dirname}/index/index.html`);
        console.log("index html to access");
    });

    exIndex.get("/index.js", (req, res) =>{
      res.sendFile(`${__dirname}/index/index.js`);
        console.log("index js to acsess");
    });
    exIndex.get("/index.css", (req, res) =>{
      res.sendFile(`${__dirname}/index/index.css`);
        console.log("index css js to acsess");
    });


    let mainWindow = null;
    
      // console.log(err);
      // console.log(stderr);
      
      if( err != null ){

        const { shell } = require('electron')
        shell.openExternal('https://www.java.com/ja/download/ie_manual.jsp')

        const electron = require('electron');
        const dialog = electron.dialog;

        console.log("インストールしてください。");
        　dialog.showErrorBox("java実行環境がありません。", "javaがインストールされていません。 \r\n"+
        "javaをインストールしてください。開いたブラウザからjava runtimeがインストールできます。");

        app.quit();

      }else{

        var switchBoolean = false;

        //________clipboard_Shortcut_________
        const clipboard = require('electron').clipboard;   
        const globalShortcut = electron.globalShortcut;

        //_index_
        const ioIndex = require('socket.io')(httpIndex);

        //_window_
        const ioWindow = require('socket.io')(httpWindow);

        ioIndex.sockets.on('connection', function (socketIndex) {

          if(store.get('key-data-window-place') == null){

            store.set('key-data-window-place', mainWindow.getPosition());
      
          }else{

            mainWindow.setPosition(store.get('key-data-window-place')[0], store.get('key-data-window-place')[1]);

          }

          if(store.get('key-data-start') == null){

            store.set('key-data-start', 'F2');
      
          }

          if(store.get('key-data-past') == null){

            store.set('key-data-past', ['control','v']);
      
          }

          socketIndex.emit("firstKeyStart",store.get('key-data-start'));
          
          socketIndex.emit("firstKeyPast",store.get('key-data-past'));

          socketIndex.on('disconnect', reason => {
            
            app.quit();
            
          });

          socketIndex.on('settingStart', function ( data ) {

            console.log(data);

            globalShortcut.unregisterAll();

            globalShortcut.register(data, function () {
  
              store.set('key-data-start', data);

              if(switchBoolean){
    
                mainWindow.setAlwaysOnTop(false);
    
                switchBoolean = false;
    
                ioIndex.sockets.emit("switch",false);
                ioWindow.sockets.emit("switch",false);
    
                console.log("F2 false");
    
              }else{
    
                mainWindow.setAlwaysOnTop(true);
                
               // mainWindow.show();
    
                switchBoolean = true;
    
                ioIndex.sockets.emit("switch",true);
                ioWindow.sockets.emit("switch",true);
    
                console.log("F2 true");
    
              }
    
            });

          });

          socketIndex.on('settingPast', function ( data ) {

            // globalShortcut.unregisterAll();

            store.set('key-data-past', data);

          });

          socketIndex.on('soundMessage', function ( data ) {

            textMessage = data;

            console.log(data);
        
            var ks = require('node-key-sender');
        
            clipboard.writeText(textMessage);
        
            ks.sendCombination(store.get('key-data-past'));

          });

          socketIndex.on('switch', function ( data ) {

            socketIndex.emit("switch",data);

            console.log(data);

          });

        });

        ioWindow.sockets.on( 'connection', function (socketWindow) {

          socketWindow.on('switch', function (data) {

            if(switchBoolean){

              ioIndex.sockets.emit("switch",false);
              ioWindow.sockets.emit("switch",false);

              console.log(false);

              switchBoolean = false;

            }else{

              ioIndex.sockets.emit("switch",true);
              ioWindow.sockets.emit("switch",true);

              console.log(true);

              switchBoolean = true;

            }

          });

          globalShortcut.register(store.get('key-data-start'), function () {

            if(switchBoolean){
  
              mainWindow.setAlwaysOnTop(false);
  
              switchBoolean = false;

              ioIndex.sockets.emit("switch",false);
              ioWindow.sockets.emit("switch",false);
  
              console.log("false");
  
            }else{
  
              mainWindow.setAlwaysOnTop(true);
              
             // mainWindow.show();
  
              switchBoolean = true;
  
              ioIndex.sockets.emit("switch",true);
              ioWindow.sockets.emit("switch",true);
  
              console.log("true");
  
            }
  
          });

        });

        mainWindow = new BrowserWindow({

            "width": 200,
            "height": 300,
            "transparent": true,    // ウィンドウの背景を透過
            "frame": false,     // 枠の無いウィンドウ
            "resizable": false,  // ウィンドウのリサイズを禁止
          });

          mainWindow.loadURL('http://localhost:8080');

        // // ChromiumのDevツールを開く
        // mainWindow.webContents.openDevTools();

        mainWindow.on('close', function() {

          store.set('key-data-window-place', mainWindow.getPosition());
          
        });

        mainWindow.on('closed', function() {

          mainWindow = null;

          ioIndex.sockets.emit("close",true);
          
        });

        const { shell } = require('electron')
        shell.openExternal('http://localhost:8000');

      }

    });

  });

}

