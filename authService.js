import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

class FirebaseAuthService {
    #auth;

    constructor(app) {
        this.#auth = getAuth(app);
    }

    async criarUsuario(email, senha) {
        return createUserWithEmailAndPassword(this.#auth, email, senha);
    }

    async login(email, senha) {
        return signInWithEmailAndPassword(this.#auth, email, senha);
    }

    async logout() {
        return signOut(this.#auth);
    }
}

export default FirebaseAuthService;
