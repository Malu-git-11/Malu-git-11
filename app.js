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

const app = initializeApp(firebaseConfig);

const authService = new FirebaseAuthService(app);

// elementos
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const msg = document.getElementById("msg");

// LOGIN
document.getElementById("btnLogin").onclick = async () => {
  try {
    await authService.login(email.value, senha.value);
    window.location.href = `perfil.html`;
  } catch (error) {
    msg.textContent = error.message;
  }
};

// CADASTRO
document.getElementById("btnCadastro").onclick = async () => {
  try {
    await authService.criarUsuario(email.value, senha.value);
    window.location.href = `perfil.html`;
  } catch (error) {
    msg.textContent = error.message;
  }
};

// SAIR
const btnSair = document.getElementById("btnSair");
if (btnSair) {
  btnSair.onclick = async () => {
    try {
      await authService.logout();
      window.location.href = "index.html";
    } catch (error) {
      msg.textContent = error.message;
    }
  };
}