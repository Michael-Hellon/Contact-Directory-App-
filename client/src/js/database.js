// TODO: Install the following package:
import { openDB } from 'idb';

const initdb = async () => {
    openDB('contact', 1, {
        upgrade(db) {
          if (db.objectStoreNames.contains('contact')) {
            console.log('contact database already exists');
            return;
          }
          db.createObjectStore('contact', { keyPath: 'id', autoIncrement: true });
          console.log('contact database created');
        },
    });
};

export const postDb = async (name, home, cell, email)  => {
    console.log('Post to the ase');
    const contactDb = await openDB('contact', 1);
    const tx = contactDb.transaction('contact', 'readwrite');
    const store = tx.objectStore('contact');
    const request = store.add({ name: name, home_phone: home, cell_phone: cell, email: email});
    const result = await request;
    console.log('Data saved to the database', result);
};

export const getDb = async () => {
  console.log('GET all from the database');
  const contactDb = await openDB('contact', 1);
  const tx = contactDb.transaction('contact', 'readonly');
  const store = tx.objectStore('contact');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);
  const contactDb = await openDB('contact', 1);
  const tx = contactDb.transaction('contact', 'readwrite');
  const store = tx.objectStore('contact');
  const request = store.delete(id);
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
