// === TAHUN OTOMATIS ===
document.getElementById("year").textContent = new Date().getFullYear();


// === ANIMASI FADE ON SCROLL ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(ent => {
    if (ent.isIntersecting) ent.target.classList.add("show");
  });
}, { threshold: 0.1 });

document.querySelectorAll(".fade").forEach(el => observer.observe(el));


// === MUSIC CONTROL ===
const audio = document.getElementById('bgm'); audio.volume = 0.3;
audio.currentTime = 1;   
    document.getElementById('musicBtn').onclick = () => {
            if (audio.paused) {
                audio.play().catch(() => {});
                document.getElementById('playIcon').style.display = 'none';
                document.getElementById('pauseIcon').style.display = 'block';
            } else {
                audio.pause();
                document.getElementById('playIcon').style.display = 'block';
                document.getElementById('pauseIcon').style.display = 'none';
            }
        };


// === DRAG MUSIC BUTTON ===
const btn = document.getElementById("musicBtn");
let isDragging = false, offsetX = 0, offsetY = 0;

function clampPosition(x, y) {
  const r = btn.getBoundingClientRect();
  return {
    x: Math.max(0, Math.min(x, window.innerWidth - r.width)),
    y: Math.max(0, Math.min(y, window.innerHeight - r.height))
  };
}

function startDrag(e) {
  isDragging = true;
  const r = btn.getBoundingClientRect();
  const evt = e.touches ? e.touches[0] : e;
  offsetX = evt.clientX - r.left;
  offsetY = evt.clientY - r.top;
}

btn.addEventListener("mousedown", startDrag);
btn.addEventListener("touchstart", startDrag);

function onDrag(e) {
  if (!isDragging) return;
  const evt = e.touches ? e.touches[0] : e;
  const { x, y } = clampPosition(evt.clientX - offsetX, evt.clientY - offsetY);
  btn.style.left = x + "px";
  btn.style.top = y + "px";
}

document.addEventListener("mousemove", onDrag);
document.addEventListener("touchmove", onDrag);

document.addEventListener("mouseup", () => isDragging = false);
document.addEventListener("touchend", () => isDragging = false);


// === COPY REKENING ===
function copyRek(id) {
  const val = document.getElementById(id).innerText;
  navigator.clipboard.writeText(val).then(() => {
    const notif = document.getElementById("notif" + id.slice(-1));
    notif.style.display = "block";
    setTimeout(() => (notif.style.display = "none"), 1500);
  });
}


// === AUTO SCROLL ===
let autoScroll = null;
let userTouching = false;

// Mulai auto scroll
function startAutoScroll() {
    if (autoScroll) return;

    autoScroll = setInterval(() => {
        window.scrollBy(0, 1); // kecepatan scroll
    }, 20);

    document.getElementById("btnAutoScroll").style.display = "none";
}

// Stop auto scroll
function stopAutoScroll() {
    clearInterval(autoScroll);
    autoScroll = null;
}

// Jika user menyentuh layar → stop auto scroll
document.addEventListener("touchstart", () => {
    userTouching = true;
    stopAutoScroll();
    document.getElementById("btnAutoScroll").style.display = "block";
});

document.addEventListener("touchend", () => {
    userTouching = false;
});

// Klik tombol untuk lanjut scroll
document.getElementById("btnAutoScroll").addEventListener("click", () => {
    startAutoScroll();
});