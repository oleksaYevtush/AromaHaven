import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";


export const saveItem = async (data) => {
  await setDoc(doc(firestore, "aromaItems", `${Date.now()}`), data, {
    merge: true,
  });
};


export const getAllAromaItems = async () => {
  const items = await getDocs(query(collection(firestore, 'aromaItems'), orderBy('id', 'desc')));
  return items.docs.map(doc => doc.data());
};
