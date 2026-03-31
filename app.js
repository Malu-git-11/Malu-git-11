import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";


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


document.addEventListener('DOMContentLoaded', () => {
 console.log(document.getElementById('btnLogin'));

// Login
 const signIn=document.getElementById('btnLogin');
 if (signIn) {
 signIn.addEventListener('click', (event)=>{
    event.preventDefault()
  const email = document.getElementById('emailLogin').value;
  const senha = document.getElementById('senhaLogin').value; 
  const auth=getAuth();

  signInWithEmailAndPassword(auth, email,senha)
 .then((userCredential)=>{
    console.log('Login feito com sucesso');
        const user=userCredential.user;
        localStorage.setItem('usuarioLogado', user.uid);
        window.location.href='perfil.html';
    })
    .catch((error)=>{
    if (error.code === 'auth/user-not-found') {
      alert('Essa conta não existe');
    } else if (error.code === 'auth/wrong-password') {
      alert('e-mail ou senha incorretos');
    } else if (error.code === 'auth/invalid-email') {
      alert('Email inválido');
    } else {
      alert('Erro ao entrar');
        }
    })
 })
}

// Cadastro
const singUp = document.getElementById('btnCadastrar');
if (singUp) {
singUp.addEventListener('click', (event) => {
event.preventDefault();
  const email = document.getElementById('emailCadastro').value;
  const senha = document.getElementById('senhaCadastro').value; 

     const auth=getAuth();
    const db=getFirestore();

  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential)=>{
    const user = userCredential.user;
    const userData ={ 
      email: email, 
      senha: senha, 
    };
    alert('Conta criada com sucesso!');

    const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='perfil.html';
        })
        .catch((error)=>{
            console.error('Erro ao criar documento:', error.message);
        });
      })
    .catch((error)=>{
    if (error.code=='auth/email-already-in-use') {
      alert('O e-mail registrado já está em uso');
    } 
    else {
      alert('Incapaz de criar o usuário: ' + error.message);
    }
  })
});
}

// SAIR
const btnSair = document.getElementById("btnSair");
if (btnSair) {
  btnSair.addEventListener('click', () => {
    const auth = getAuth();
    localStorage.removeItem('usuarioLogado');
    signOut(auth)
      .then(() => window.location.href = 'index.html')
      .catch(error => console.error('Erro ao deslogar:', error));
  });
}
});