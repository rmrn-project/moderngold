
// ═══════════════════════════════════════════════════════════
// JS LENGKAP UNDANGAN PREMIUM GOLD — 100% JALAN SEMUA HP
// ═══════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", function () {

    // === 1. TAHUN OTOMATIS ===
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // === 2. FADE ON SCROLL (semua elemen .fade) ===
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".fade").forEach(el => observer.observe(el));

    // === 3. BACKGROUND MUSIC + TOMBOL PLAY/PAUSE + DRAG ===
    const audio = document.getElementById("bgm");
    const musicBtn = document.getElementById("musicBtn");
    const playIcon = document.getElementById("playIcon");
    const pauseIcon = document.getElementById("pauseIcon");

    if (audio && musicBtn) {
        audio.volume = 0.4;
        audio.preload = "auto";

        // Play otomatis saat user interaksi pertama (bypass autoplay block)
        function unlockAudio() {
            audio.play().catch(() => {});
            document.body.removeEventListener("touchstart", unlockAudio);
            document.body.removeEventListener("click", unlockAudio);
        }
        document.body.addEventListener("touchstart", unlockAudio);
        document.body.addEventListener("click", unlockAudio);

        // Klik tombol
        musicBtn.onclick = function () {
            if (audio.paused) {
                audio.play().catch(() => {});
                playIcon.style.display = "none";
                pauseIcon.style.display = "block";
            } else {
                audio.pause();
                playIcon.style.display = "block";
                pauseIcon.style.display = "none";
            }
        };
    }

    // === DRAG MUSIC BUTTON (bisa digeser kemana saja) ===
    if (musicBtn) {
        let isDragging = false;
        let offsetX = 0, offsetY = 0;

        const startDrag = (e) => {
            e.preventDefault();
            isDragging = true;
            const rect = musicBtn.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            offsetX = clientX - rect.left;
            offsetY = clientY - rect.top;
        };

        const moveDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            let x = (e.touches ? e.touches[0].clientX : e.clientX) - offsetX;
            let y = (e.touches ? e.touches[0].clientY : e.clientY) - offsetY;

            const maxX = window.innerWidth - musicBtn.offsetWidth;
            const maxY = window.innerHeight - musicBtn.offsetHeight;

            x = Math.max(10, Math.min(x, maxX - 10));
            y = Math.max(10, Math.min(y, maxY - 10));

            musicBtn.style.left = x + "px";
            musicBtn.style.top = y + "px";
            musicBtn.style.right = "auto";
            musicBtn.style.bottom = "auto";
        };

        const stopDrag = () => isDragging = false;

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

