import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyDWcjhGvqct-Sjx7sEEqB8CfoDRqYmRoN4",
    authDomain: "react-native-9be3f.firebaseapp.com",
    projectId: "react-native-9be3f",
    storageBucket: "react-native-9be3f.appspot.com",
    messagingSenderId: "625384197096",
    appId: "1:625384197096:web:9159f755bd4f68ba75725d",
    measurementId: "G-P4BFTN2WXS"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const notesCollection = firestore().collection('Notes');

async function getAllNotes() {
  try {
    const notes = (await notesCollection.get()).docs();
    return notes.docs;
  } catch (e) {
    Alert.alert(e);
  }
}

async function addNote(data) {
  try {
    const notes = await notesCollection.add(data);
    // return doc id
    return notes;
  } catch (e) {
    Alert.alert(e);
  }
}

async function deleteNote(id) {
  try {
    await notesCollection.doc(id).delete();
  } catch (e) {
    Alert.alert(e);
  }
}

export default {
  getAllNotes,
  deleteNote,
  addNote,
};
