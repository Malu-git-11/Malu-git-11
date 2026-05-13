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

//  MAPA 
const map = L.map('map').setView([-23.5505, -46.403], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

//  MARCADORES 

// URGÊNCIA
L.marker([-23.5522, -46.4066]).addTo(map)
    .bindPopup("<b>Hospital Geral de Guaianases</b><br>24 horas");

L.marker([-23.5534, -46.4012]).addTo(map)
    .bindPopup("<b>UPA Júlio Tupy</b><br>24 horas");

L.marker([-23.5511, -46.3986]).addTo(map)
    .bindPopup("<b>AMA Pres. Juscelino Kubitschek</b><br>24 horas");

// UBS
L.marker([-23.5486, -46.4021]).addTo(map).bindPopup("<b>UBS Guaianases</b>");
L.marker([-23.5472, -46.4053]).addTo(map).bindPopup("<b>UBS Guaianases II</b>");
L.marker([-23.5602, -46.4103]).addTo(map).bindPopup("<b>UBS Jardim Aurora</b>");
L.marker([-23.5551, -46.4202]).addTo(map).bindPopup("<b>UBS Jardim Bandeirantes</b>");
L.marker([-23.5490, -46.4170]).addTo(map).bindPopup("<b>UBS Jardim Etelvina</b>");
L.marker([-23.5455, -46.4090]).addTo(map).bindPopup("<b>UBS Jardim Fanganiello</b>");
L.marker([-23.5700, -46.4300]).addTo(map).bindPopup("<b>UBS Jardim Robru</b>");
L.marker([-23.5570, -46.4150]).addTo(map).bindPopup("<b>UBS Jardim Soares</b>");
L.marker([-23.5530, -46.4120]).addTo(map).bindPopup("<b>UBS Prefeito Celso Daniel</b>");
L.marker([-23.5460, -46.4180]).addTo(map).bindPopup("<b>UBS Primeiro de Outubro</b>");
L.marker([-23.5515, -46.4220]).addTo(map).bindPopup("<b>UBS Santa Luzia</b>");
L.marker([-23.5620, -46.4350]).addTo(map).bindPopup("<b>UBS Vila Chabilândia</b>");
L.marker([-23.5440, -46.3980]).addTo(map).bindPopup("<b>UBS Vila Cosmopolita</b>");

// ESPECIALIDADES
L.marker([-23.5540, -46.4095]).addTo(map).bindPopup("<b>AMA Especialidades São Carlos</b>");
L.marker([-23.5540, -46.4095]).addTo(map).bindPopup("<b>CEO II Guaianases</b>");
L.marker([-23.5540, -46.4095]).addTo(map).bindPopup("<b>CER II Guaianases</b>");
L.marker([-23.5570, -46.4150]).addTo(map).bindPopup("<b>CER II Jardim Soares</b>");

// CAPS
L.marker([-23.5500, -46.4100]).addTo(map).bindPopup("<b>CAPS AD II Guaianases</b>");
L.marker([-23.5520, -46.4070]).addTo(map).bindPopup("<b>CAPS Adulto II</b>");
L.marker([-23.5480, -46.4050]).addTo(map).bindPopup("<b>CAPS Infantojuvenil II</b>");

// OUTROS
L.marker([-23.5530, -46.4180]).addTo(map)
    .bindPopup("<b>Centro de Práticas Naturais</b>");

// ===== PREFEITURA =====
const prefeituraCoords = [-23.5425, -46.4107];

const marcadorPrefeitura = L.marker(prefeituraCoords)
    .addTo(map)
    .bindPopup("Subprefeitura de Guaianases");

//  BOTÕES 

// MINHA LOCALIZAÇÃO 
function findMe() {
    if (!navigator.geolocation) {
        alert("Seu navegador não suporta localização");
        irParaPrefeitura();
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

// IR PARA PREFEITURA
function irParaPrefeitura() {
    map.setView(prefeituraCoords, 16);
    marcadorPrefeitura.openPopup();
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