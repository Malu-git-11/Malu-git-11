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

// Coordenadas da Prefeitura de Guaianases (ponto de referência)
const prefeitura = [-23.5426, -46.4143];

// Inicializa o mapa
const map = L.map('map').setView(prefeitura, 14);

// Camada do mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);


// LOCAIS

// CATE
L.marker([-23.5415, -46.4118], { icon })
    .addTo(map)
    .bindPopup("<b>CATE Guaianases</b><br>Hipólito de Camargo, 479");

// CRAS
L.marker([-23.5438, -46.4132], { icon })
    .addTo(map)
    .bindPopup("<b>CRAS Guaianases</b><br>Rua Clarínia, 19");

// CREAS
L.marker([-23.5445, -46.4148], { icon })
    .addTo(map)
    .bindPopup("<b>CREAS Guaianases</b><br>Rua Nabuco de Abreu, 06");

// Ministério Público (centro)
L.marker([-23.5505, -46.6333], { icon })
    .addTo(map)
    .bindPopup("<b>Ministério Público SP</b><br>Rua Riachuelo, 115");

// Conselho Tutelar Guaianases
L.marker([-23.5432, -46.4125], { icon })
    .addTo(map)
    .bindPopup("<b>Conselho Tutelar Guaianases</b><br>Rua Centralina, 254");

// Conselho Tutelar Lajeado
L.marker([-23.5375, -46.4078], { icon })
    .addTo(map)
    .bindPopup("<b>Conselho Tutelar Lajeado</b><br>Rua General Otelo Franco");

// FUNÇÃO: IR PARA PREFEITURA
function irParaPrefeitura() {
    map.setView(prefeitura, 16);

    L.marker(prefeitura)
        .addTo(map)
        .bindPopup("<b>Prefeitura de Guaianases</b>")
        .openPopup();
}

// FUNÇÃO: MINHA LOCALIZAÇÃO
function findMe() {
    map.locate({ setView: true, maxZoom: 16 });

    map.on('locationfound', function (e) {
        L.marker(e.latlng)
            .addTo(map)
            .bindPopup("Você está aqui")
            .openPopup();
    });

    map.on('locationerror', function () {
        alert("Não foi possível acessar sua localização");
    });
}