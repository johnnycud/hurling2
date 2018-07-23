import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase, copy this from the cloud console
// Or use mine :)
var config = {
    apiKey: "AIzaSyCnHOAAkr-M6qQo0RNKfcyN50W4Jxg6CYU",
    authDomain: "profile-2-8bf3b.firebaseapp.com",
    databaseURL: "https://profile-2-8bf3b.firebaseio.com",
    projectId: "profile-2-8bf3b",
    storageBucket: "profile-2-8bf3b.appspot.com",
    messagingSenderId: "673917979616"
};
firebase.initializeApp(config);

// The shared state object that any vue component can get access to.
// Has some placeholders that we’ll use further on!
export const store = {
    playersInFeed: null,
    currentUser: null,
    writeBall: (message) => playersCollection.add({
        createdOn: new Date(),
        author: store.currentUser,
        message
    })
};

// When a user logs in or out, save that in the store
firebase.auth().onAuthStateChanged((user) => {
    store.currentUser = user;
});

const playersCollection = firebase.firestore()
    .collection('players');

playersCollection
    .onSnapshot((playersRef) => {
        const players = [];
        playersRef.forEach((doc) => {
            const player = doc.data();
            player.id = doc.id;
            players.push(player);
        });
        store.playersInFeed = players;
    });