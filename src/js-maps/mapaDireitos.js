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

// Coordenadas da Prefeitura
const prefeitura = [-23.5426, -46.4143];

// Inicializa mapa
const map = L.map('map').setView(prefeitura, 14);

// Camada
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// LOCAIS (AGORA PADRÃO IGUAL AO CULTURA)

// CATE
L.marker([-23.5415, -46.4118]).addTo(map)
    .bindPopup("<b>CATE Guaianases</b><br>Hipólito de Camargo, 479");

// CRAS
L.marker([-23.5438, -46.4132]).addTo(map)
    .bindPopup("<b>CRAS Guaianases</b><br>Rua Clarínia, 19");

// CREAS
L.marker([-23.5445, -46.4148]).addTo(map)
    .bindPopup("<b>CREAS Guaianases</b><br>Rua Nabuco de Abreu, 06");

// Ministério Público
L.marker([-23.5505, -46.6333]).addTo(map)
    .bindPopup("<b>Ministério Público SP</b><br>Rua Riachuelo, 115");

// Conselho Tutelar Guaianases
L.marker([-23.5432, -46.4125]).addTo(map)
    .bindPopup("<b>Conselho Tutelar Guaianases</b><br>Rua Centralina, 254");

// Conselho Tutelar Lajeado
L.marker([-23.5375, -46.4078]).addTo(map)
    .bindPopup("<b>Conselho Tutelar Lajeado</b><br>Rua General Otelo Franco");

// MARCADOR DA PREFEITURA (igual ao cultura)
const marcadorPrefeitura = L.marker(prefeitura)
    .addTo(map)
    .bindPopup("<b>Subprefeitura de Guaianases</b>");

// IR PARA PREFEITURA
function irParaPrefeitura() {
    map.setView(prefeitura, 16);
    marcadorPrefeitura.openPopup();
}

// LOCALIZAÇÃO (padronizada também)
function findMe() {
    if (!navigator.geolocation) {
        alert("Geolocalização não suportada");
        return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        L.marker([lat, lng]).addTo(map)
            .bindPopup("Você está aqui")
            .openPopup();

        map.setView([lat, lng], 15);
    });
}

// BARRA DE PESQUISA
const campoPesquisa = document.getElementById("pesquisa");

campoPesquisa.addEventListener("input", () => {

    const texto = campoPesquisa.value.toLowerCase();

    // pega todos os itens da lista
    const itens = document.querySelectorAll(".lista-saude li");

    itens.forEach(item => {

        const titulo = item.querySelector("h2").textContent.toLowerCase();
        const endereco = item.querySelector("p").textContent.toLowerCase();

        // verifica se encontrou o texto
        if (titulo.includes(texto) || endereco.includes(texto)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }

    });

});

//ABRIR DESCRICAO DOS EQUIPAMENTOS DE SAÚDE
const equipamentos = document.querySelectorAll(".lista-saude li");

equipamentos.forEach(item => {

    item.addEventListener("click", () => {

        item.classList.toggle("ativo");

    })
})