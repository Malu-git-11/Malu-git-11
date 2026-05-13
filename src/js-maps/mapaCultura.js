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
    .bindPopup("Subprefeitura de Guaianases");

// IR PARA PREFEITURA
function irParaCentro() {
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