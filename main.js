const { app, BrowserWindow } = require('electron');
const path = require('path');

// 🔐 Contrasenya secreta
const secret = ".fcb";
let buffer = "";
let allowClose = false;

function createWindow() {

  const win = new BrowserWindow({

    width: 1200,
    height: 800,

    autoHideMenuBar: true,

    fullscreen : true,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }

  });

  win.loadFile(
    path.join(__dirname, 'assets/index.html')
  );

  // 🛑 BLOQUEJAR EL TANCAMENT
  win.on("close", (event) => {
    if (!allowClose) {
      event.preventDefault();
      console.log("Intent de tancar bloquejat");
    }
  });

  // 🎹 DETECTAR SEQÜÈNCIA DE TECLAT (.fcb)
  win.webContents.on("before-input-event", (event, input) => {
    if (input.type === "keyDown") {

      buffer += input.key.toLowerCase();

      // Limitar la mida del buffer
      if (buffer.length > secret.length) {
        buffer = buffer.slice(-secret.length);
      }

      // Si coincideix amb la contrasenya → sortir
      if (buffer === secret) {
        console.log("Contrasenya secreta detectada! Tancant aplicació...");
        allowClose = true;
        win.close();
      }
    }
  });
}

app.whenReady().then(createWindow);


