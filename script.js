
// ═══════════════════════════════════════════════════════════
// JS TERPISAH — MUSIC BUTTON DRAG + PLAY/PAUSE STABIL DI HP
// ═══════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", function() {

    // === 1. TAHUN OTOMATIS ===
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // === 2. FADE ON SCROLL (semua elemen .fade) ===
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("show");
        });
    }, { threshold: 0.15 });
    document.querySelectorAll(".fade").forEach(el => observer.observe(el));

    // === 3. BACKGROUND MUSIC + TOMBOL PLAY/PAUSE + DRAG ===

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


//FUNGSI DRAG PLAY BUTTON

        const btn = document.getElementById("musicBtn");
let isDragging = false, offsetX = 0, offsetY = 0;

function clampPosition(x, y) {
    const r = btn.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Batas minimum dan maksimum
    const minX = 0;
    const minY = 0;
    const maxX = vw - r.width;
    const maxY = vh - r.height;

    // Kembalikan nilai yang sudah dikunci agar tidak keluar
    return {
        x: Math.max(minX, Math.min(x, maxX)),
        y: Math.max(minY, Math.min(y, maxY))
    };
}

btn.addEventListener("mousedown", e => {
    isDragging = true;
    const r = btn.getBoundingClientRect();
    offsetX = e.clientX - r.left;
    offsetY = e.clientY - r.top;
});

btn.addEventListener("touchstart", e => {
    isDragging = true;
    const r = btn.getBoundingClientRect();
    offsetX = e.touches[0].clientX - r.left;
    offsetY = e.touches[0].clientY - r.top;
});

document.addEventListener("mousemove", e => {
    if (isDragging) {
        let { x, y } = clampPosition(e.clientX - offsetX, e.clientY - offsetY);
        btn.style.left = x + "px";
        btn.style.top = y + "px";
    }
});

document.addEventListener("touchmove", e => {
    if (isDragging) {
        let { x, y } = clampPosition(e.touches[0].clientX - offsetX, e.touches[0].clientY - offsetY);
        btn.style.left = x + "px";
        btn.style.top = y + "px";
    }
});

document.addEventListener("mouseup", () => isDragging = false);
document.addEventListener("touchend", () => isDragging = false);





});



    
    // === 4. AUTO SCROLL + TOMBOL PANAH BAWAH ===
    let autoScroll = null;
    const btnAuto = document.getElementById("btnAutoScroll");

    const startAutoScroll = () => {
        if (autoScroll) return;
        autoScroll = setInterval(() => {
            window.scrollBy(0, 1);
            // Berhenti otomatis kalau udah sampai bawah
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
                stopAutoScroll();
            }
        }, 20);
        if (btnAuto) btnAuto.style.display = "none";
    };

    const stopAutoScroll = () => {
        clearInterval(autoScroll);
        autoScroll = null;
        if (btnAuto) btnAuto.style.display = "block";
    };

    if (btnAuto) {
        btnAuto.addEventListener("click", startAutoScroll);
    }

    // Sentuh layar = stop auto scroll
    document.addEventListener("touchstart", () => {
        stopAutoScroll();
    });

    // Auto start setelah 3 detik (bisa dihapus kalau ga mau langsung jalan)
    setTimeout(startAutoScroll, 3000);

    // === 5. COPY NOMOR REKENING / HADIAH ===
    window.copyRek = function (id) {
        const text = document.getElementById(id).innerText;
        navigator.clipboard.writeText(text).then(() => {
            const notif = document.getElementById("notif" + id.slice(-1));
            if (notif) {
                notif.style.opacity = "1";
                setTimeout(() => notif.style.opacity = "0", 2000);
            }
        }).catch(() => {
            // Fallback untuk HP lama
            const textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            alert("Berhasil disalin: " + text);
        });
    };

    // === 6. GALLERY INFINITE LOOP (kalau pakai JS duplikat) ===
    const slidesContainer = document.getElementById("slides");
    if (slidesContainer && slidesContainer.children.length > 0) {
        // Duplikat otomatis biar infinite mulus
        slidesContainer.innerHTML += slidesContainer.innerHTML;
    }

    console.log("Undangan Premium Gold — semua fitur aktif!");
});

