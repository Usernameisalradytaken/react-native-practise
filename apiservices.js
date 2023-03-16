import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import firebaseConfig from './firebaseConfig.json'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const notesCollection = firestore().collection('Notes');

async function getAllNotes() {
  try {
    // const notes = (await notesCollection.get());
    const snapshot = await notesCollection.get();
    let notes = [];
    snapshot.forEach(doc => {
      notes.push({key: doc.id, ...doc.data()});
      // console.log(doc.id, '=>', doc.data());
    });
    // console.log(notes);
    return notes;
  } catch (e) {
    console.log(e);
    Alert.alert(e);
  }
}

async function addNote(data) {
  try {
    // console.log(data);
    const note = await notesCollection.add(data);
    // console.log(note);
    // return doc id
    return note;
  } catch (e) {
    console.log(e);
    Alert.alert(e);
  }
}

async function deleteNote(id) {
  try {
    await notesCollection.doc(id).delete();
  } catch (e) {
    console.log(e);
    Alert.alert(e);
  }
}

export const apiService = {
  getAllNotes,
  deleteNote,
  addNote,
};
