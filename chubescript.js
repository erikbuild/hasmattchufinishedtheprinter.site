// === EASTER EGGS ===

// 1. Console ASCII Art
console.log(`
%c
  ██████╗ ██████╗ ██╗███╗   ██╗████████╗███████╗██████╗
  ██╔══██╗██╔══██╗██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
  ██████╔╝██████╔╝██║██╔██╗ ██║   ██║   █████╗  ██████╔╝
  ██╔═══╝ ██╔══██╗██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗
  ██║     ██║  ██║██║██║ ╚████║   ██║   ███████╗██║  ██║
  ╚═╝     ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝

  STATUS: ❌ No

  try the konami code ;)
      `, 'color: #ff6b6b; font-family: monospace;');

// 2. Konami Code
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateKonamiMode();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateKonamiMode() {
  const statuses = document.querySelectorAll('.status');
  const originals = [];
  statuses.forEach((s, i) => {
    originals[i] = s.innerHTML;
    s.innerHTML = '+2 weeks';
    s.style.color = '#ff6b6b';
  });

  // Confetti!
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: hsl(${Math.random() * 360}, 100%, 50%);
      left: ${Math.random() * 100}vw;
      top: -10px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: fall ${2 + Math.random() * 3}s linear forwards;
    `;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }

  // Add confetti animation
  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
      @keyframes fall {
        to { transform: translateY(110vh) rotate(720deg); }
      }
    `;
    document.head.appendChild(style);
  }

  // Revert after 5 seconds
  setTimeout(() => {
    statuses.forEach((s, i) => {
      s.innerHTML = originals[i];
      s.style.color = '';
    });
  }, 5000);
}

// 3. Frustrated No-Clicker
let noClickCount = 0;
let lastClickedNo = null;
document.querySelectorAll('.status').forEach(status => {
  if (status.textContent.includes('No')) {
    status.style.cursor = 'pointer';
    status.addEventListener('click', () => {
      if (lastClickedNo !== status) {
        noClickCount = 0;
        lastClickedNo = status;
      }
      noClickCount++;
      if (noClickCount >= 10) {
        const original = status.innerHTML;
        status.innerHTML = 'still no lmao';
        setTimeout(() => status.innerHTML = original, 2000);
        noClickCount = 0;
      }
    });
  }
});

// 4. Cereal Counter
const cerealCard = document.getElementById('cereal-card');
const cerealSubstatus = document.getElementById('cereal-substatus');
if (cerealCard && cerealSubstatus) {
  const cerealDate = new Date('2025-12-29'); // Approximate date mattchu got cereal
  cerealCard.style.cursor = 'pointer';
  cerealCard.addEventListener('click', () => {
    const days = Math.floor((new Date() - cerealDate) / (1000 * 60 * 60 * 24));
    cerealSubstatus.innerHTML = `🎉 ${days} days since cereal! 🥣`;
    setTimeout(() => cerealSubstatus.innerHTML = 'congrats on cereal 🥣', 3000);
  });
}

// 5. Blame Counter
const blameCard = document.getElementById('blame-card');
const blameCounter = document.getElementById('blame-counter');
if (blameCard && blameCounter) {
  let blameCount = parseInt(localStorage.getItem('blameCount') || '0');
  blameCounter.textContent = blameCount > 0 ? `blamed ${blameCount} times` : '';
  blameCard.style.cursor = 'pointer';
  blameCard.addEventListener('click', () => {
    blameCount++;
    localStorage.setItem('blameCount', blameCount);
    blameCounter.textContent = `blamed ${blameCount} times`;
    blameCounter.style.color = '#ff6b6b';
    setTimeout(() => blameCounter.style.color = '', 500);
  });
}

// 6. Title Triple-Click (toggle darkness mode)
const title = document.querySelector('h1');
let titleClicks = 0;
let titleClickTimer;
let darknessActive = false;
let darknessOverlay = null;
if (title) {
  title.style.cursor = 'pointer';
  title.addEventListener('click', () => {
    titleClicks++;
    clearTimeout(titleClickTimer);
    titleClickTimer = setTimeout(() => titleClicks = 0, 500);
    if (titleClicks >= 3) {
      titleClicks = 0;
      if (darknessActive) {
        // Turn off darkness
        document.body.style.filter = '';
        if (darknessOverlay) {
          darknessOverlay.remove();
          darknessOverlay = null;
        }
        darknessActive = false;
      } else {
        // Turn on darkness
        document.body.style.filter = 'invert(1)';
        darknessOverlay = document.createElement('div');
        darknessOverlay.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: black;
          color: red;
          padding: 20px;
          border-radius: 10px;
          z-index: 9999;
          font-size: 20px;
          text-align: center;
        `;
        darknessOverlay.textContent = 'the darkness consumes all unfinished printers';
        document.body.appendChild(darknessOverlay);
        darknessActive = true;
      }
    }
  });
}

// 7. Shake / R Key - Fake Yes (ALL of them!)
function fakeYes() {
  const noStatuses = [...document.querySelectorAll('.status')].filter(s => s.textContent.includes('No'));
  if (noStatuses.length === 0) return;
  const originals = noStatuses.map(s => s.innerHTML);

  noStatuses.forEach(s => {
    s.innerHTML = '✅ Yes!';
    s.style.color = '#4ade80';
  });

  setTimeout(() => {
    noStatuses.forEach(s => {
      s.innerHTML = 'jk lol';
      s.style.color = '#ff6b6b';
    });
  }, 3000);

  setTimeout(() => {
    noStatuses.forEach((s, i) => {
      s.innerHTML = originals[i];
      s.style.color = '';
    });
  }, 5000);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'r' || e.key === 'R') {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      fakeYes();
    }
  }
});

// Shake detection for mobile
let lastShake = 0;
window.addEventListener('devicemotion', (e) => {
  const acc = e.accelerationIncludingGravity;
  if (!acc) return;
  const shake = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);
  if (shake > 30 && Date.now() - lastShake > 3000) {
    lastShake = Date.now();
    fakeYes();
  }
});

// 8. Chube Clicks - Sad Trombone
const chubeCard = document.getElementById('chube-card');
let chubeClicks = 0;
if (chubeCard) {
  chubeCard.style.cursor = 'pointer';
  chubeCard.addEventListener('click', () => {
    chubeClicks++;
    if (chubeClicks >= 5) {
      // Sad trombone sound (base64 encoded short beep as fallback)
      const audio = new Audio('https://www.myinstants.com/media/sounds/sad-trombone.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // If external audio fails, do a visual effect instead
        chubeCard.style.animation = 'shake 0.5s';
        setTimeout(() => chubeCard.style.animation = '', 500);
      });
      chubeClicks = 0;
    }
  });
}

// Shake animation for chube
if (!document.getElementById('shake-style')) {
  const style = document.createElement('style');
  style.id = 'shake-style';
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(style);
}

// 9. Cursor Trail - Type "printer" / Mattchu Orange - Type "mattchu"
let typedKeys = '';
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  typedKeys += e.key.toLowerCase();
  typedKeys = typedKeys.slice(-8); // Keep last 8 chars (for "positron")
  if (typedKeys.endsWith('printer')) {
    activatePrinterTrail();
    typedKeys = '';
  }
  if (typedKeys.endsWith('mattchu')) {
    activateMattchuMode();
    typedKeys = '';
  }
  if (typedKeys.endsWith('positron')) {
    activatePositronMode();
    typedKeys = '';
  }
});

function activatePrinterTrail() {
  let trailActive = true;
  setTimeout(() => trailActive = false, 10000);

  document.addEventListener('mousemove', function trail(e) {
    if (!trailActive) {
      document.removeEventListener('mousemove', trail);
      return;
    }
    const printer = document.createElement('div');
    printer.textContent = '🖨️';
    printer.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      pointer-events: none;
      z-index: 9999;
      font-size: 20px;
      opacity: 1;
      transition: opacity 1s, transform 1s;
    `;
    document.body.appendChild(printer);
    setTimeout(() => {
      printer.style.opacity = '0';
      printer.style.transform = 'translateY(20px) scale(0.5)';
    }, 50);
    setTimeout(() => printer.remove(), 1000);
  });
}

// 10. Mattchu Mode - Type "mattchu"
function activateMattchuMode() {
  const overlay = document.createElement('div');
  overlay.id = 'mattchu-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url('https://pexpeppers.com/cdn/shop/files/Orbital-Orange_ed8d5219-abbd-405b-9cf7-0e89cf9a7742_1024x1024@2x.png?v=1766275868') center center no-repeat;
    background-size: contain;
    z-index: 99999;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;
  `;
  document.body.appendChild(overlay);

  // Fade in
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
  });

  // Fade out and remove after 3 seconds
  setTimeout(() => {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 300);
  }, 3000);
}

// 11. Positron Mode - Type "positron" to flip the page upside down
let positronActive = false;
function activatePositronMode() {
  if (positronActive) {
    // Turn off positron mode
    document.body.style.transition = 'transform 0.5s ease-in-out';
    document.body.style.transform = '';
    positronActive = false;
  } else {
    // Flip the page upside down
    document.body.style.transition = 'transform 0.5s ease-in-out';
    document.body.style.transform = 'rotate(180deg)';
    positronActive = true;
  }
}
