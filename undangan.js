// Fungsi untuk mendapatkan parameter dari URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Ambil nama dari URL
const guestName = getQueryParam("nama");

// Tampilkan di halaman jika ada
if (guestName) {
    document.getElementById("guest-name").innerText = guestName;
} else {
    document.getElementById("guest-name").innerText = "Tamu Undangan";
}

// Countdown Timer
const eventDate = new Date("2031-02-01T00:00:00").getTime();
const countdown = document.getElementById("countdown");

setInterval(() => {
    const now = new Date().getTime();
    const diff = eventDate - now;

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdown.innerHTML = `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
}, 1000);

// Form RSVP
document.getElementById("rsvp-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Terima kasih sudah mengkonfirmasi kehadiran!");
});

window.addEventListener("load", function() {
    let music = document.getElementById("bg-music");
    
    // Pastikan musik bisa diputar setelah interaksi pengguna
    music.play().catch(() => {
        console.log("Autoplay diblokir, menunggu interaksi pengguna.");
    });
    
    // Jika autoplay gagal, aktifkan ketika pengguna pertama kali klik di mana saja
    document.body.addEventListener("click", function() {
        if (music.paused) {
            music.play();
        }
    }, { once: true });
});

function openGoogleMaps() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let userLat = position.coords.latitude;
            let userLng = position.coords.longitude;
            let destinationLat = -7.143086;  // Ganti dengan koordinat lokasi tujuan
            let destinationLng = 111.989102; // Ganti dengan koordinat lokasi tujuan
            
            // Buat URL Google Maps dengan posisi pengguna sebagai titik awal
            let mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;

            // Buka di tab baru
            window.open(mapsUrl, "_blank");
        }, function(error) {
            alert("Gagal mendapatkan lokasi Anda, gunakan Google Maps secara manual.");
        });
    } else {
        alert("Geolocation tidak didukung di browser Anda.");
    }
}

function shareToWhatsApp() {
    let url = window.location.href;
    let message = encodeURIComponent("Saya mengundang Anda ke acara pernikahan kami! Klik untuk melihat undangan: " + url);
    window.open("https://wa.me/qr/XTLOQ5WKMTLWN1" + message, "_blank");
}

function shareToInstagram() {
    alert("Instagram tidak mendukung berbagi langsung dari web. Silakan salin link undangan secara manual.");
}
