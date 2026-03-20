// =====================
// SERVICE WORKER
// =====================
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registrado com sucesso!'))
        .catch(err => console.log('Erro ao registrar Service Worker:', err));
}

// MAPA INICIAL (Prefeitura)
const prefeituraCoords = [-23.5429, -46.4143];

let map = L.map('map').setView(prefeituraCoords, 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Marcador fixo da Prefeitura
const marcadorPrefeitura = L.marker(prefeituraCoords)
    .addTo(map)
    .bindPopup("Prefeitura de Guaianases")
    .openPopup();

// BOTÃO: MINHA LOCALIZAÇÃO
function findMe() {
    if (!navigator.geolocation) {
        alert("Seu navegador não suporta localização");
        irParaPrefeitura();
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            success(position); // usa a mesma função já existente
        },
        () => {
            alert("Você não permitiu a localização.");
            irParaPrefeitura();
        }
    );
        navigator.geolocation.getCurrentPosition(success, error);
}



// BOTÃO: VOLTAR PRA PREFEITURA
function irParaPrefeitura() {
    map.setView(prefeituraCoords, 16);
    marcadorPrefeitura.openPopup();
}

// LOCALIZAÇÃO DO USUÁRIO
let userMarker = null;
let userCircle = null;

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    const latlon = [lat, lon];

    map.setView(latlon, 16);

    if (userMarker) {
        userMarker.setLatLng(latlon);
    } else {
        userMarker = L.marker(latlon)
            .addTo(map)
            .bindPopup("Você está aqui!")
            .openPopup();
    }

    if (userCircle) {
        userCircle.setLatLng(latlon).setRadius(accuracy);
    } else {
        userCircle = L.circle(latlon, { radius: accuracy }).addTo(map);
    }
}

function error() {
    alert("Localização não permitida. Voltando para a Prefeitura.");
    irParaPrefeitura();
}

