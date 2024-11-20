import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Alert } from 'react-native';
import { Appbar, useTheme, Button, Card, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPedidos, finalizarPedido } from '../services/PedidosService';

interface Pedido {
  id?: string;
  produtos: { id: string; quantidade: number }[];
  status: string;
  total: number;
  data: Date;
}

const PedidosScreen = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]); // Adicionado o tipo Pedido[]
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      setIsLoading(true);
      const pedidosData = await getPedidos();
      setPedidos(pedidosData); // Agora o TypeScript sabe que pedidosData é do tipo Pedido[]
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os pedidos.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalizarPedido = async (id: string) => {
    try {
      await finalizarPedido(id);
      Alert.alert('Sucesso', 'Pedido finalizado com sucesso!');
      fetchPedidos(); // Atualiza a lista de pedidos
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível finalizar o pedido.');
      console.error(error);
    }
  };

  const renderPedido = ({ item }: { item: Pedido }) => (
    <Card style={styles.card}>
      <Card.Title title={`Pedido ID: ${item.id}`} subtitle={`Status: ${item.status}`} />
      <Card.Content>
        <Paragraph>Total: R$ {item.total.toFixed(2)}</Paragraph>
        <Text>Itens:</Text>
        {item.produtos.map((produto) => (
          <Text key={produto.id}>- ID: {produto.id}, Quantidade: {produto.quantidade}</Text>
        ))}
      </Card.Content>
      <Card.Actions>
        {item.status !== 'Finalizado' && (
          <Button mode="contained" onPress={() => handleFinalizarPedido(item.id!)}>
            Finalizar Compra
          </Button>
        )}
      </Card.Actions>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Appbar.Header>
        <Appbar.Content title="Pedidos" titleStyle={{ color: theme.colors.onPrimary }} />
      </Appbar.Header>
      <View style={[styles.content, styles.container, { backgroundColor: theme.colors.background }]}>
        {isLoading ? (
          <Text style={styles.loadingText}>Carregando pedidos...</Text>
        ) : (
          <FlatList
            data={pedidos}
            keyExtractor={(item) => item.id!}
            renderItem={renderPedido}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhum pedido encontrado.</Text>}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingTop: 10, paddingBottom: 10, justifyContent:'center', },
  card: { marginBottom: 16 },
  loadingText: { textAlign: 'center', marginTop: 20 },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16 },
});

export default PedidosScreen;
