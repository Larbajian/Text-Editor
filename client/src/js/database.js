import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const postDb = async (content) =>{
const jateDb = await openDB('jate', 1);
const tx = jateDb.transaction('jate','readwrite');
const jateStore = tx.objectStore('jate');
const request = jateStore.add({ jate: content });
const result = await request;
console.log('text created', result);
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
//console.error('putDb not implemented');
const jateDb = await openDB('jate',1);
const tx = jateDb.transaction('jate', 'readwrite');
const jateStore = tx.objectStore('jate');
const request = jateStore.put({id: id, jate: content});
const result = await request;
console.log('text saved', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
//console.error('getDb not implemented');
const jateDb = await openDB('jate', 1);
const tx = jateDb.transaction('jate', 'readonly');
const jateStore = tx.objectStore('jate');
const request = jateStore.getAll();
const result = await request;
console.log('result.value', result);
};


initdb();
