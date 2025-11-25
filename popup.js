// === POPUP JS AUTO-GENERATOR ===

// Delay muncul popup (10 detik)
setTimeout(() => {
    // Buat container popup
    const popup = document.createElement("div");
    popup.id = "rmrn-popup";
    popup.innerHTML = `
        <div class="popup-box">
            <button class="popup-close">&times;</button>

            <h2>Paket Fitur 25K</h2>
            <ul>
                <li>Ganti font</li>
                <li>Ganti musik</li>
            </ul>

            <p style="margin-top:15px;font-weight:bold;">
                Mau tambah fitur data ucapan?
            </p>

            <div class="popup-section">
                <p><strong>Setting database ucapan:</strong></p>
                <ul>
                    <li>Full service setting database Google pribadi +50rb</li>
                    <li>Pakai database RMRN: 100rb / tahun</li>
                </ul>
            </div>

            <a href="https://wa.me/628xxxxxx" class="popup-wa" target="_blank">
                Lanjut hubungi WA kami
            </a>
        </div>
    `;

    document.body.appendChild(popup);

    // Event close
    popup.querySelector(".popup-close").addEventListener("click", () => {
        popup.remove();
    });

}, 10000); // 10 detik


// === CSS Inject ===
const style = document.createElement("style");
style.innerHTML = `
#rmrn-popup {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
}
#rmrn-popup .popup-box {
    background: #fff;
    width: 90%;
    max-width: 350px;
    padding: 25px 20px;
    border-radius: 14px;
    position: relative;
    font-family: Arial, sans-serif;
    animation: fadeIn .3s ease;
}
#rmrn-popup .popup-close {
    position: absolute;
    top: 8px;
    right: 12px;
    font-size: 26px;
    background: none;
    border: none;
    cursor: pointer;
}
#rmrn-popup h2 {
    font-size: 20px;
    margin-bottom: 10px;
}
#rmrn-popup ul {
    padding-left: 20px;
    margin-bottom: 10px;
}
#rmrn-popup .popup-section {
    margin-top: 10px;
}
.popup-wa {
    display: block;
    background: #25D366;
    color: #fff;
    padding: 12px;
    text-align: center;
    border-radius: 8px;
    margin-top: 15px;
    text-decoration: none;
    font-weight: bold;
}
.popup-wa:hover {
    opacity: 0.85;
}
@keyframes fadeIn {
    from { opacity: 0; transform: scale(.9); }
    to   { opacity: 1; transform: scale(1); }
}
`;
document.head.appendChild(style);