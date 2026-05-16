const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars =
  "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@";

const fontSize = 24;

const columns =
  Math.floor(canvas.width / fontSize);

const drops = Array(columns).fill(1);

function drawMatrix() {

  ctx.fillStyle = "rgba(0,0,0,0.08)";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.fillStyle = "#00ff00";

  ctx.font =
    fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {

    const text =
      chars[
        Math.floor(
          Math.random() * chars.length
        )
      ];

    ctx.fillText(
      text,
      i * fontSize,
      drops[i] * fontSize
    );

    if (
      drops[i] * fontSize >
        canvas.height &&
      Math.random() > 0.975
    ) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 33);

const lines = [

  "Analitzant sistema...",
  "Escanejant Descarregues...",
  "Agafant contrasenyes desades a l'ordinador...",
  "Ui... Que és això?? Això no hauria d'estar aqui...",
  "Compartint totes les dades...", 
  "Conectant amb servidors...",
  "Canviant totes les notes dels alumnes...",

];

const consoleDiv =
  document.getElementById("console");

let currentLine = 0;

function typeLine(text) {

  const line =
    document.createElement("div");

  consoleDiv.appendChild(line);

  let charIndex = 0;

  const typing = setInterval(() => {

    line.textContent =
      "> " + text.substring(0, charIndex);

    charIndex++;

    
    if (charIndex > text.length) {

      clearInterval(typing);

      currentLine++;

      
      if (currentLine < lines.length) {

        setTimeout(() => {

          typeLine(lines[currentLine]);

        }, 1500);

      }

    }

  }, 50);

}

typeLine(lines[0]);