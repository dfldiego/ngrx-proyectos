import { Injectable } from '@angular/core';
//firebase
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
//ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
//rxjs
import { map } from 'rxjs/operators';
//models
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubcription: Subscription;

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  //metodo subscripto a los cambios de la info de autenticacion.
  initAuthListener() {
    //debo evaluar si existe o no el usuario.
    this.auth.authState.subscribe(fuser => {
      console.log(fuser);
      if (fuser !== null) {
        //existe
        this.userSubcription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe((firestoreUser: any) => {
            console.log(firestoreUser);
            //firestoreUser -> data de usuario de firebase.
            const user = Usuario.fromFirebase(firestoreUser);
            this.store.dispatch(authActions.setUser({ user: user }));
          })
      } else {
        //no existe
        if (this.userSubcription) {
          this.userSubcription.unsubscribe();
        }
        this.store.dispatch(authActions.unSetUser());
      }
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(fuser => {
        console.log("fuser", fuser);
        const newUser = new Usuario(fuser.user.uid, nombre, fuser.user.email);
        return this.firestore.doc(`${fuser.user.uid}/usuario`).set({ ...newUser })
      })
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fuser => fuser != null)
    );
  }

}
