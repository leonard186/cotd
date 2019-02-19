import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA8TJqZfDMltTtENwsIBbhI9UioFtK1c9w",
    authDomain: "catch-of-the-day-58869.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-58869.firebaseio.com",
    projectId: "catch-of-the-day-58869",
    storageBucket: "catch-of-the-day-58869.appspot.com",
    messagingSenderId: "76493253517"
};

const firebaseApp = firebase.initializeApp(config);

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;