import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, Alert } from 'react-native';
import { Appbar, useTheme, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../contexts/CartContext';
import ProdutoCard from '../components/ProdutoCard';
import { createPedido } from '../services/PedidosService';

const CarrinhoScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cart, removeFromCart, clearCart } = useCart();
  const theme = useTheme();

  // Calcular o total do carrinho
  const total = cart.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  const handleEnviarPedido = async () => {
    if (cart.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione produtos ao carrinho antes de enviar o pedido.');
      return;
    }

    try {
      setIsSubmitting(true);

      const pedido = {
        produtos: cart.map((item) => ({ id: item.id!, quantidade: item.quantidade })),
        status: 'Pendente',
        total,
        data: new Date(),
      };

      await createPedido(pedido); // Chama o serviço
      Alert.alert('Sucesso', 'Pedido enviado com sucesso!');
      clearCart(); // Limpa o carrinho
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao enviar o pedido. Tente novamente.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Appbar.Header>
        <Appbar.Content title="Carrinho de Compras" titleStyle={{ color: theme.colors.onPrimary }} />
      </Appbar.Header>
      <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
        {cart.length > 0 ? (
          <FlatList
            horizontal
            data={cart}
            keyExtractor={(item) => item.id!}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <ProdutoCard produto={item} quantidade={item.quantidade} isCardapio />
                <Button
                  mode="contained"
                  onPress={() => removeFromCart(item.id!)}
                  style={styles.button}
                >
                  Remover
                </Button>
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyCart}>
            <Text>Seu carrinho está vazio...</Text>
          </View>
        )}
        <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
        <Button
          mode="contained"
          onPress={handleEnviarPedido}
          style={styles.clearCartButton}
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Enviar Pedido
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  productContainer: { marginBottom: 16 },
  button: { marginTop: 8 },
  clearCartButton: { margin: 16 },
  content: { flex: 1, padding: 16 },
  emptyCart: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  totalText: { textAlign: 'center', fontSize: 18, marginVertical: 16, fontWeight: 'bold' },
});

export default CarrinhoScreen;
