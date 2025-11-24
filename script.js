
// ═══════════════════════════════════════════════════════════
// JS LENGKAP UNDANGAN PREMIUM GOLD — 100% JALAN SEMUA HP
// ═══════════════════════════════════════════════════════════

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
    const musicBtn = document.getElementById("musicBtn");
    const audio = document.getElementById("bgm");

    if (musicBtn && audio) {
        audio.volume = 0.3;
        audio.currentTime = 1;

        // Klik untuk play/pause
        musicBtn.addEventListener("click", () => {
            if (audio.paused) {
                audio.play().catch(() => {});
                document.getElementById('playIcon').style.display = 'none';
                document.getElementById('pauseIcon').style.display = 'block';
            } else {
                audio.pause();
                document.getElementById('playIcon').style.display = 'block';
                document.getElementById('pauseIcon').style.display = 'none';
            }
        });

        // Drag button
        let isDragging = false, offsetX = 0, offsetY = 0;

        function clampPosition(x, y) {
            const rect = musicBtn.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            return {
                x: Math.max(0, Math.min(x, vw - rect.width)),
                y: Math.max(0, Math.min(y, vh - rect.height))
            };
        }

        function startDrag(e) {
            isDragging = true;
            const rect = musicBtn.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            offsetX = clientX - rect.left;
            offsetY = clientY - rect.top;
            e.preventDefault();
        }

        function moveDrag(e) {
            if (!isDragging) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            let { x, y } = clampPosition(clientX - offsetX, clientY - offsetY);
            musicBtn.style.left = x + "px";
            musicBtn.style.top = y + "px";
            musicBtn.style.right = "auto";
            musicBtn.style.bottom = "auto";
            e.preventDefault();
        }

        function stopDrag() { isDragging = false; }

        musicBtn.addEventListener("mousedown", startDrag);
        musicBtn.addEventListener("touchstart", startDrag, { passive: false });
        document.addEventListener("mousemove", moveDrag);
        document.addEventListener("touchmove", moveDrag, { passive: false });
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchend", stopDrag);
    }

    
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

