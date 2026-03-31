// CADASTRO (CRIAR CONTA)
document.addEventListener("DOMContentLoaded", () => {
  const botaoCadastro = document.getElementById("btCadastrar");

  if (botaoCadastro) {
    botaoCadastro.addEventListener("click", () => {
      const email = document.getElementById("emailCadastro").value;
      const senha = document.getElementById("senhaCadastro").value;

      if (email === "" || senha === "") {
        alert("Preencha todos os campos!");
        return;
      }

      // Salva usuário
      const usuario = {
        email: email
      };

      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

      // Redireciona direto pro perfil
      window.location.href = "perfil.html";
    });
  }
});

// LOGIN
function login() {
  const email = document.getElementById("emailLogin").value;
  const senha = document.getElementById("senhaLogin").value;

  if (email === "" || senha === "") {
    alert("Preencha todos os campos!");
    return;
  }

  // Simulação de login (depois você pode trocar por banco de dados)
  const usuario = {
    email: email
  };

  // Salva no navegador
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

  // Redireciona para o perfil
  window.location.href = "perfil.html";
}

// CADASTRO
function cadastrar() {
  window.location.href = "cadastro.html";
}

// VERIFICA SE ESTÁ LOGADO (usar no perfil.html depois se quiser)
function verificarLogin() {
  const usuario = localStorage.getItem("usuarioLogado");

  if (!usuario) {
    alert("Você precisa estar logado!");
    window.location.href = "index.html";
  }
}

// LOGOUT (botão sair do perfil)
function sair() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "index.html";
}

// ATIVAR BOTÃO SAIR (perfil.html)
document.addEventListener("DOMContentLoaded", () => {
  const btnSair = document.getElementById("btnSair");

  if (btnSair) {
    btnSair.addEventListener("click", sair);
  }
});