
// ═══════════════════════════════════════════════════════════
// JS TERPISAH — MUSIC BUTTON DRAG + PLAY/PAUSE STABIL DI HP
// ═══════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", function() {

    // === 1. TAHUN OTOMATIS ===
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // === 2. FADE ON SCROLL ===
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll(".fade").forEach(el => observer.observe(el));

    // === 3. BACKGROUND MUSIC + TOMBOL PLAY/PAUSE ===
    const audio = document.getElementById('bgm');
    if (audio) {
        audio.volume = 0.3;
        audio.currentTime = 1;
    }

    const musicBtn = document.getElementById('musicBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');

    if (musicBtn && audio) {
        musicBtn.onclick = () => {
            if (audio.paused) {
                audio.play().catch(err => console.log("Play error:", err));
                if (playIcon) playIcon.style.display = 'none';
                if (pauseIcon) pauseIcon.style.display = 'block';
            } else {
                audio.pause();
                if (playIcon) playIcon.style.display = 'block';
                if (pauseIcon) pauseIcon.style.display = 'none';
            }
        };
    }

    // === 4. DRAG MUSIC BUTTON ===
    if (!musicBtn) return; // kalau ga ada tombolnya, stop di sini

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Agar bisa di-drag, tombol harus position: fixed atau absolute
    musicBtn.style.position = 'fixed';
    musicBtn.style.cursor = 'move';
    // opsional: posisi awal
    musicBtn.style.left = '20px';
    musicBtn.style.bottom = '20px';
    musicBtn.style.top = 'auto';

    function clampPosition(x, y) {
        const rect = musicBtn.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;

        return {
            x: Math.max(0, Math.min(x, maxX)),
            y: Math.max(0, Math.min(y, maxY))
        };
    }

    // Mouse events
    musicBtn.addEventListener("mousedown", e => {
        isDragging = true;
        const rect = musicBtn.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        e.preventDefault(); // biar ga select teks
    });

    // Touch events
    musicBtn.addEventListener("touchstart", e => {
        isDragging = true;
        const rect = musicBtn.getBoundingClientRect();
        offsetX = e.touches[0].clientX - rect.left;
        offsetY = e.touches[0].clientY - rect.top;
    });

    document.addEventListener("mousemove", e => {
        if (isDragging) {
            const pos = clampPosition(e.clientX - offsetX, e.clientY - offsetY);
            musicBtn.style.left = pos.x + "px";
            musicBtn.style.top = pos.y + "px";
        }
    });

    document.addEventListener("touchmove", e => {
        if (isDragging) {
            const pos = clampPosition(e.touches[0].clientX - offsetX, e.touches[0].clientY - offsetY);
            musicBtn.style.left = pos.x + "px";
            musicBtn.style.top = pos.y + "px";
        }
    });

    document.addEventListener("mouseup", () => isDragging = false);
    document.addEventListener("touchend", () => isDragging = false);

}); // <-- penutup DOMContentLoaded yang benar

    
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

