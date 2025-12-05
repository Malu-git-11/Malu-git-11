import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import FirebaseAuthService from "./authService.js";

// CONFIGURAÇÃO
const firebaseConfig = {
  apiKey: "AIzaSyDZdVNXrPZR4BjAWaaePkkYyGkivl_1o_8",
  authDomain: "tcc-mapeamento.firebaseapp.com",
  projectId: "tcc-mapeamento",
  storageBucket: "tcc-mapeamento.firebasestorage.app",
  messagingSenderId: "523192941421",
  appId: "1:523192941421:web:558335e3abc335d4453864",
  measurementId: "G-4N89CQH5ZW"
};

// Inicializa Firebase
const fbApp = initializeApp(firebaseConfig);
getAnalytics(fbApp);
const authService = new FirebaseAuthService(fbApp);

// Detecta o formulário correto
const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");

// ========================= LOGIN =========================
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const resultado = await authService.loginComEmailESenha(email, senha);

    if (resultado.sucesso) {
      window.location.href = `perfil.html?email=${encodeURIComponent(email)}`;
    } else {
      alert("Erro ao fazer login: " + resultado.erro.message);
    }
  });
};

// ======================= CADASTRO ========================
if (cadastroForm) {
  cadastroForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const resultado = await authService.criarUsuarioComEmailESenha(email, senha);

    if (resultado.sucesso) {
      window.location.href = `perfil.html?email=${encodeURIComponent(email)}`;
    } else {
      alert("Erro ao cadastrar usuário: " + resultado.erro.message);
    }
  });
}
