const Equipamentos = [
    //Cultura e Esporte em Guaianases
    {   
        categoria:"Cultura",
        nome: "Casa de cultura de Guaianases",
        endereco: "R. Castelo do Piauí, s/n",
        horario: "🕐 09:00 às 21:00 (domingo até 17:00)",
        telefone: "📞 (11) 2016-1961",
        descricao: "",
        coordernadas: ""
    },
    {
        categoria:"Esporte e Lazer (CDCs)",
        nome: "CDC Serra Queimada",
        endereco: "R. Serra da Queimada, 857 - Parque Guaianazes",
        horario: "🕐 24 horas",
        telefone: "📞 (11) 96712-0524",
        descricao: "",
        coordernadas: ""
    },
    {
        categoria:"Esporte e Lazer (CDCs)",
        nome: "CDC Isidoro Mateus",
        endereco: "Vila Marilena, São Paulo",
        horario: "🕐 24 horas",
        telefone: "📞 (11) 95889-7543",
        descricao: "",
        coordernadas: ""
    }, 
    {
        categoria:"Esporte e Lazer (CDCs)",
        nome: "CDC Marcílio Alves Prado",
        endereco: "Jardim Gianetti, São Paulo - SP, 08430-350",
        horario: "🕐 08:00 às 22:00",
        telefone: "📞 (11) 6513-8831",
        descricao: "",
        coordernadas: ""
    },
    {
        categoria:"Trabalho",
        nome: "CATE Guaianases",
        endereco: "Hipólito de Camargo, 479 - Vila Lourdes",
        horario: "🕐 Horário sob consulta",
        telefone: "",
        descricao: "",
        coordernadas: ""
    },
    {
        categoria:"Assistência Social",
        nome: "CRAS Guaianases",
        endereco: "Rua Clarínia, 19",
        horario: "🕐 24 horas",
        telefone: "📞 (11) 2363-9593 / 2363-9594",
        descricao: "",
        coordernadas: ""
    }, 
    {
        categoria:"Assistência Social",
        nome: "CREAS Guaianases",
        endereco: "Rua Nabuco de Abreu, 06",
        horario: "🕐 08:00 às 22:00",
        telefone: "📞 (11) 2554-7115",
        descricao: "",
        coordernadas: ""
    },
    //Direitos e Assistência em Guaianases
    {
        categoria:"Proteção dos Direitos",
        nome: "Ministério Público de São Paulo",
        endereco: "Rua Riachuelo, 115 - 1º andar",
        horario: "🕐 24 horas",
        telefone: "📞 (11) 3119-9090 (Saúde Pública)",
        descricao: "",
        coordernadas: ""
    }, 
    {
        categoria:"Conselho Tutelar",
        nome: "Conselho Tutelar de Guaianases",
        endereco: "Rua Centralina, 254",
        horario: "🕐 08:00 às 22:00",
        telefone: "📞 (11) 2392-9530",
        descricao: "",
        coordernadas: ""
    },
    {
        categoria:"Conselho Tutelar de Lajeado",
        nome: "Conselho Tutelar de Lajeado",
        endereco: "Rua General Otelo Franco, 08/10",
        horario: "🕐 08:00 às 22:00",
        telefone: "📞 (11) 2392-8720",
        descricao: "",
        coordernadas: ""
    },
    //Saúde em Guaianases
        {
        categoria:"Urgência e Emergência",
        nome: "Hospital Geral de Guaianases",
        endereco: "Av. Miguel Achiole da Fonseca, 135",
        horario: "🕐 24 horas",
        telefone: "📞 (11) 2551-3300",
        descricao: "",
        coordernadas: ""
    }, 
    {
        categoria:"Urgência e Emergência",
        nome: "UPA Júlio Tupy",
        endereco: "R. Serra da Queimada, 800",
        horario: "🕐 24 horas",
        telefone: "📞 (11) 2511-6665",
        descricao: "",
        coordernadas: ""
    },
    {
        categoria:"Urgência e Emergência",
        nome: "AMA Presidente Juscelino Kubitschek",
        endereco: "Av. Utaro Kanai, 286",
        horario: "🕐 24 horas",
        telefone: "📞 (11) 3808-7210/ 2555-4474",
        descricao: "",
        coordernadas: ""
    },
]

const listasaude = document.querySelector(".lista-saude");
const searchInput = document.getElementById("searchInput");


 const displayData = Equipamentos => { 
    listasaude.innerHTML = "";
    Equipamentos.forEach(e => {
        listasaude.innerHTML += `
        <li>
          <h2>${e.nome}</h2>
          <p>${e.endereco}</p>
          <span class="horario">${e.horario}</span>
          <span class="horario">${e.telefone}</span>
        </li>`;
    });
}

searchInput.addEventListener("keyup", (e) => {
    const search = Equipamentos.filter(i => 
        i.nome.toLowerCase().includes(e.target.value.toLowerCase())
    );
    displayData(search);
});

window.addEventListener("load", () => displayData(Equipamentos));