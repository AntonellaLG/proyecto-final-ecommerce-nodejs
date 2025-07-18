import { db } from "./data.js";
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, setDoc } from "firebase/firestore";

const booksCollection = collection(db, "products");

export const getAllBooks = async () => {
    try {
      const snapshot = await getDocs(booksCollection);
      //genero un array con todos los documentos que tengo dentro de la colección
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error(error);
    }
};

export const getBookById = async (id) => {
    try {
        //busco si hay un elemento con ese id en la colección, y traigo una referencia de ese doc
        const bookRef = doc(booksCollection, id);
        //traigo el doc con esa ref
        const snapshot = await getDoc(bookRef);
        return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
    } catch (error) {
        console.error(error);
    }
};

export const createBook = async (data) => {
    try {
        //guardo data en la colección, esto me devuelve una ref del doc
        const docRef = await addDoc(booksCollection, data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error(error);
    }
};

export async function updateBookById(id, bookData){
    try {
        const bookRef = doc(booksCollection, id);
        const snapshot = await getDoc(bookRef);
    
        if (!snapshot.exists()) {
          return false;
        }
        // reemplazo completo
        await setDoc(bookRef, bookData); 
        return { id, ...bookData };
    } catch (error) {
        console.error(error);
    }
};

export const deleteBookById = async (id) => {
    try {
        const bookRef = doc(booksCollection, id);
        const snapshot = await getDoc(bookRef);
    
        if (!snapshot.exists()) {
          return false;
        }
    
        await deleteDoc(bookRef);
        return true;
    } catch (error) {
        console.error(error);
    }
};