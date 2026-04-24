// SERVICE WORKER
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
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
    .bindPopup("Subprefeitura de Guaianases")
    .openPopup();

// BOTÃO: MINHA LOCALIZAÇÃO
function findMe() {
    if (!navigator.geolocation) {
        alert("Seu navegador não suporta localização");
        irParaPrefeitura();
        return;
    }

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

// ÍCONES PERSONALIZADOS
const iconeSaude = L.icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32]
});

const iconeCultura = L.icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png",
    iconSize: [32, 32]
});

const iconeEsporte = L.icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [32, 32]
});

const iconeTrabalho = L.icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    iconSize: [32, 32]
});

const iconeSocial = L.icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
    iconSize: [32, 32]
});

const iconeDireitos = L.icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    iconSize: [32, 32]
});

// PONTOS NO MAPA
const pontos = [
    { lat: -23.5423, lng: -46.4088, nome: "Hospital Geral de Guaianases", icon: iconeSaude },
    { lat: -23.5447, lng: -46.4125, nome: "UBS Guaianases II", icon: iconeSaude },
    { lat: -23.5502, lng: -46.4162, nome: "UBS Guaianases", icon: iconeSaude },

    { lat: -23.5436, lng: -46.4152, nome: "Casa de Cultura de Guaianases", icon: iconeCultura },

    { lat: -23.5472, lng: -46.4045, nome: "CDC Serra Queimada", icon: iconeEsporte },

    { lat: -23.5440, lng: -46.4120, nome: "CATE Guaianases", icon: iconeTrabalho },

    { lat: -23.5435, lng: -46.4135, nome: "CRAS Guaianases", icon: iconeSocial },

    { lat: -23.5505, lng: -46.6333, nome: "Ministério Público de SP", icon: iconeDireitos }
];

pontos.forEach(ponto => {
    L.marker([ponto.lat, ponto.lng], { icon: ponto.icon })
        .addTo(map)
        .bindPopup(ponto.nome);
});
