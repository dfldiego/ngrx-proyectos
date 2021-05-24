export class Usuario {

    //metodo estatico que devuelve una nueva instancia del usuario
    static fromFirebase({ email, nombre, uid }) {
        console.log(email);
        console.log(nombre);
        console.log(uid);
        return new Usuario(uid, nombre, email);
    }

    constructor(
        public uid: string,
        public nombre: string,
        public email: string,
    ) { }
}