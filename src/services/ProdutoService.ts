import { db } from '../config/firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Produto } from '../models/Produto';

const produtosCollection = collection(db, 'produtos');

// Criação de um produto
export const createProduto = async (produto: Produto) => {
  try {
    const docRef = await addDoc(produtosCollection, { ...produto });
    return { ...produto, id: docRef.id };
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
};

// Obtenção de produtos
export const getProdutos = async (): Promise<Produto[]> => {
  try {
    const querySnapshot = await getDocs(produtosCollection);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Produto));
    return data;
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    throw error;
  }
};

// Atualização de produto
export const updateProduto = async (produto: Produto) => {
  try {
    const produtoDoc = doc(db, 'produtos', produto.id!);

    await updateDoc(produtoDoc, { ...produto });
    return { ...produto };
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
  }
};

// Deleção de produto
export const deleteProduto = async (id: string) => {
  try {
    const produtoDoc = doc(db, 'produtos', id);
    await deleteDoc(produtoDoc);
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    throw error;
  }
};
