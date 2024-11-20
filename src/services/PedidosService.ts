import { db } from '../config/firebaseConfig';
import { collection, addDoc, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { Produto } from '../models/Produto';

interface Pedido {
  id?: string;
  produtos: { id: string; quantidade: number }[];
  status: string;
  total: number;
  data: Date;
}

// Referência à coleção de pedidos no Firestore
const pedidosCollection = collection(db, 'pedidos');

// Criação de um pedido
export const createPedido = async (pedido: Pedido) => {
  try {
    const docRef = await addDoc(pedidosCollection, pedido);
    return { ...pedido, id: docRef.id };
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    throw error;
  }
};

// Obter pedidos
export const getPedidos = async (): Promise<Pedido[]> => {
  try {
    const querySnapshot = await getDocs(pedidosCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Pedido));
  } catch (error) {
    console.error('Erro ao obter pedidos:', error);
    throw error;
  }
};

// Atualizar o status do pedido
export const finalizarPedido = async (id: string) => {
  try {
    // Referência ao documento do pedido
    const pedidoDocRef = doc(db, 'pedidos', id);
    
    // Buscar os detalhes do pedido
    const pedidoSnapshot = await getDoc(pedidoDocRef);
    if (!pedidoSnapshot.exists()) {
      throw new Error('Pedido não encontrado.');
    }
    const pedido = pedidoSnapshot.data();

    // Atualizar o status do pedido para "Finalizado"
    await updateDoc(pedidoDocRef, { status: 'Finalizado' });

    // Atualizar o estoque dos produtos comprados
    for (const produto of pedido.produtos) {
      const produtoDocRef = doc(db, 'produtos', produto.id);
      const produtoSnapshot = await getDoc(produtoDocRef);

      if (produtoSnapshot.exists()) {
        const produtoData = produtoSnapshot.data() as Produto;

        // Verificar se há estoque suficiente
        if (produtoData.estoque >= produto.quantidade) {
          // Reduzir a quantidade no estoque
          const novoEstoque = produtoData.estoque - produto.quantidade;
          await updateDoc(produtoDocRef, { estoque: novoEstoque });
        } else {
          console.warn(`Estoque insuficiente para o produto ID: ${produto.id}`);
        }
      } else {
        console.warn(`Produto ID: ${produto.id} não encontrado no estoque.`);
      }
    }
  } catch (error) {
    console.error('Erro ao finalizar pedido:', error);
    throw error;
  }
};
