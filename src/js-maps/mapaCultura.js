// MENU
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => menu.classList.toggle("active"));
menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => menu.classList.remove("active")));

// SUBMENU
const btnCategorias = document.getElementById("btnCategorias");
const submenu = document.getElementById("submenuCategorias");

btnCategorias.addEventListener("click", (e) => {
    e.stopPropagation();
    submenu.classList.toggle("active");
});
document.addEventListener("click", () => submenu.classList.remove("active"));

// MAPA
const prefeituraCoords = [-23.5425, -46.4107];
const map = L.map('map').setView([-23.5505, -46.403], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

const marcadorPrefeitura = L.marker(prefeituraCoords)
    .addTo(map)
    .bindPopup("Subprefeitura de Guaianases");

// CARREGA JSON E RENDERIZA
fetch('./src/data/cultura.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("conteudo-cultura");

        data.categorias.forEach(categoria => {
            const h3 = document.createElement("h3");
            h3.className = "categoria";
            h3.textContent = categoria.titulo;
            container.appendChild(h3);

            const ul = document.createElement("ul");
            ul.className = "lista-saude";

            categoria.equipamentos.forEach(eq => {
                if (eq.coords) {
                    L.marker(eq.coords).addTo(map)
                        .bindPopup(`<b>${eq.nome}</b><br>${eq.endereco}`);
                }

                const li = document.createElement("li");
                li.innerHTML = `
                    <h2>${eq.nome}</h2>
                    <p>${eq.endereco}</p>
                    <span class="horario ${eq.destaque ? 'destaque' : ''}">🕐 ${eq.horario}</span>
                    <div class="descricao">${eq.descricao}</div>
                `;
                li.addEventListener("click", () => li.classList.toggle("ativo"));
                ul.appendChild(li);
            });

            container.appendChild(ul);
        });

        // PESQUISA
        const campoPesquisa = document.getElementById("pesquisa");
        campoPesquisa.addEventListener("input", () => {
            const texto = campoPesquisa.value.toLowerCase();
            const itens = document.querySelectorAll(".lista-saude li");

            if (texto.length > 0) {
                document.querySelector(".lista-saude").scrollIntoView({ behavior: "smooth" });
            }

            itens.forEach(item => {
                const titulo = item.querySelector("h2").textContent.toLowerCase();
                const endereco = item.querySelector("p").textContent.toLowerCase();
                const descricao = item.querySelector(".descricao").textContent.toLowerCase();

                if (titulo.includes(texto) || endereco.includes(texto) || descricao.includes(texto)) {
                    item.style.display = "block";
                    if (texto.length > 0) item.classList.add("ativo");
                } else {
                    item.style.display = "none";
                    item.classList.remove("ativo");
                }
            });

            if (texto.length === 0) {
                itens.forEach(item => item.classList.remove("ativo"));
            }
        });
    });

// BOTÕES
function findMe() {
    if (!navigator.geolocation) {
        alert("Geolocalização não suportada");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
            L.marker([coords.latitude, coords.longitude]).addTo(map)
                .bindPopup("Você está aqui").openPopup();
            map.setView([coords.latitude, coords.longitude], 15);
        },
        () => {
            alert("Não foi possível obter sua localização");
            irParaCentro();
        }
    );
}

function irParaCentro() {
    map.setView(prefeituraCoords, 16);
    marcadorPrefeitura.openPopup();
}