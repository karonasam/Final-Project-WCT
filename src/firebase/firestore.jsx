import { db, storage } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

const booksRef = collection(db, "books");

export async function addBook(book) {
  return await addDoc(booksRef, book);
}

export async function getBooks() {
  const snapshot = await getDocs(booksRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function updateBook(id, data) {
  const bookRef = doc(db, "books", id);
  return await updateDoc(bookRef, data);
}

export async function deleteBook(id) {
  const bookRef = doc(db, "books", id);
  return await deleteDoc(bookRef);
}

// NEW: uploads a cover image file to Storage, returns its public URL
export async function uploadBookCover(file) {
  const safeName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const storageRef = ref(storage, `book-covers/${safeName}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}