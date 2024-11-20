import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, StatusBar } from 'react-native';
import { FAB, Appbar, useTheme, Snackbar, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  createProduto,
  getProdutos,
  updateProduto,
  deleteProduto,
} from '../services/ProdutoService'; // Serviço atualizado
import ProdutoCard from '../components/ProdutoCard';
import ProdutoForm from '../components/ProdutoForm';
import { Produto } from '../models/Produto';

const CadastroProdutosScreen = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleAddPress = () => {
    setSelectedProduto(null);
    setIsFormVisible(true);
  };

  const handleEditPress = (produto: Produto) => {
    setSelectedProduto(produto);
    setIsFormVisible(true);
  };

  const fetchProdutos = async () => {
    try {
      setIsLoading(true);
      const produtosData: Produto[] = await getProdutos();
      setProdutos(produtosData);
    } catch (error) {
      setSnackbarMessage('Erro ao obter produtos: ' + error);
      setSnackbarVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (produto: Produto) => {
    try {
      setIsLoading(true);

      if (produto.id) {
        // Atualiza o produto existente
        await updateProduto(produto);
      } else {
        // Cria um novo produto
        await createProduto(produto!);
      }

      setIsFormVisible(false);
      await fetchProdutos();
    } catch (error) {
      setSnackbarMessage('Erro ao salvar produto: ' + error);
      setSnackbarVisible(true);
      setIsFormVisible(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (produto: Produto) => {
    try {
      setIsLoading(true);
      await deleteProduto(produto.id!);
      await fetchProdutos();
    } catch (error) {
      setSnackbarMessage('Erro ao deletar produto: ' + error);
      setSnackbarVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.surface} />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
        <Appbar.Header>
          <Appbar.Content title="Cadastro de Produtos" titleStyle={{ color: theme.colors.onPrimary }} />
        </Appbar.Header>
        {produtos.length > 0 ? (
          <View style={[styles.content, styles.container, { backgroundColor: theme.colors.background }]}>
            {isLoading ? (
              <ActivityIndicator size="large" color={theme.colors.primary} />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={true}
                data={produtos}
                keyExtractor={(item) => item.id!}
                renderItem={({ item }) => (
                  <ProdutoCard
                    produto={item}
                    onEditPress={handleEditPress}
                    onDeletePress={() => handleDelete(item)}
                  />
                )}
              />
            )}
          </View>
        ) : (
          <View style={[styles.view, styles.content, { backgroundColor: theme.colors.background }]}>
            <Text>Não há registros para ser exibidos...</Text>
          </View>
        )}
        <FAB style={[styles.fab, { backgroundColor: theme.colors.primary }]} icon="plus" onPress={handleAddPress} />
        <ProdutoForm
          visible={isFormVisible}
          onDismiss={() => setIsFormVisible(false)}
          onSave={handleSave}
          produto={selectedProduto}
        />
      </SafeAreaView>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  fab: { position: 'absolute', right: 16, bottom: 16 },
  view: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingTop: 10, paddingBottom: 10, justifyContent:'center', },
});

export default CadastroProdutosScreen;
