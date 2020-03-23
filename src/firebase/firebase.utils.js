import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBFspsiSRilwv8gVGPsM8w50cr7-L_Fitw",
    authDomain: "crwn-db-503d6.firebaseapp.com",
    databaseURL: "https://crwn-db-503d6.firebaseio.com",
    projectId: "crwn-db-503d6",
    storageBucket: "crwn-db-503d6.appspot.com",
    messagingSenderId: "507836892497",
    appId: "1:507836892497:web:33c22196ffd44afc07bf70",
    measurementId: "G-6RLYEVS0TE"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;