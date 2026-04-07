// MENU
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
});

const links = menu.querySelectorAll("a");
links.forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
    });
});

// SUBMENU
const btnCategorias = document.getElementById("btnCategorias");
const submenu = document.getElementById("submenuCategorias");

btnCategorias.addEventListener("click", (e) => {
    e.stopPropagation();
    submenu.classList.toggle("active");
});

document.addEventListener("click", () => {
    submenu.classList.remove("active");
});

// MAPA
const map = L.map('map').setView([-23.5505, -46.403], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// LOCAIS

L.marker([-23.5506, -46.4018]).addTo(map)
    .bindPopup("<b>Casa de Cultura de Guaianases</b>");

L.marker([-23.5270, -46.4108]).addTo(map)
    .bindPopup("<b>CDC Serra Queimada</b>");

L.marker([-23.5590, -46.4139]).addTo(map)
    .bindPopup("<b>CDC Isidoro Mateus</b>");

L.marker([-23.5235, -46.4216]).addTo(map)
    .bindPopup("<b>CDC Marcílio Alves Prado</b>");

// LOCALIZAÇÃO
function findMe() {
    if (!navigator.geolocation) {
        alert("Geolocalização não suportada");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        L.marker([lat, lng]).addTo(map)
            .bindPopup("Você está aqui")
            .openPopup();

        map.setView([lat, lng], 15);
    },
    function (error) {
        alert("Não foi possível obter sua localização");
        console.log(error);
        irParaPrefeitura();
    }
  );
}

// PREFEITURA 
const prefeituraCoords = [-23.5425, -46.4107];

const marcadorPrefeitura = L.marker(prefeituraCoords)
    .addTo(map)
    .bindPopup("Prefeitura de Guaianases");

// IR PARA PREFEITURA
function irParaCentro() {
    map.setView(prefeituraCoords, 16);
    marcadorPrefeitura.openPopup();
}