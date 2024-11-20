import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, StatusBar } from 'react-native';
import { FAB, Appbar, useTheme, Snackbar, ActivityIndicator, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProdutos } from '../services/ProdutoService'; // Serviço atualizado
import ProdutoCard from '../components/ProdutoCard';
import { Produto } from '../models/Produto';
import { useCart } from '../contexts/CartContext';

const CardapioScreen = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [produtosPorCategoria, setProdutosPorCategoria] = useState<{ [key: string]: Produto[] }>({});

  const theme = useTheme();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      setIsLoading(true);
      const produtosData: Produto[] = await getProdutos();
      const categoriasUnicas = Array.from(new Set(produtosData.map((produto) => produto.categoria)));
      setCategorias(categoriasUnicas);
      const produtosCategoriaMap: { [key: string]: Produto[] } = {};
      categoriasUnicas.forEach((categoria) => {
        produtosCategoriaMap[categoria] = produtosData.filter((produto) => produto.categoria === categoria);
      });
      setProdutosPorCategoria(produtosCategoriaMap);
      setProdutos(produtosData);
    } catch (error) {
      setSnackbarMessage('Erro ao obter produtos: ' + error);
      setSnackbarVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (produto: Produto) => {
    addToCart(produto);
    setSnackbarMessage(`${produto.nome} adicionado ao carrinho.`);
    setSnackbarVisible(true);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.surface} />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Appbar.Header>
          <Appbar.Content title="Cardápio" titleStyle={{ color: theme.colors.onPrimary }} />
        </Appbar.Header>
        {produtos.length > 0 ? (
          <View style={[styles.content, styles.container, { backgroundColor: theme.colors.background }]}>
            {isLoading ? (
              <ActivityIndicator size="large" color={theme.colors.primary} />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={true}
                data={categorias}
                keyExtractor={(item) => item}
                renderItem={({ item: categoria }) => (
                  <View style={styles.categoriaContainer}>
                    <Text style={styles.categoriaTitle}>{categoria}</Text>
                    <FlatList
                      data={produtosPorCategoria[categoria]}
                      keyExtractor={(item) => item.id!}
                      horizontal
                      renderItem={({ item }) => (
                        <View style={styles.productContainer}>
                          <ProdutoCard produto={item} onEditPress={function (produto: Produto): void {
                                  throw new Error('Function not implemented.');
                              } } onDeletePress={function (id: string): void {
                                  throw new Error('Function not implemented.');
                              } } isCardapio={true}/>
                          <Button
                            mode="contained"
                            onPress={() => handleAddToCart(item)}
                            style={styles.button}
                          >
                            Adicionar ao Carrinho
                          </Button>
                        </View>
                      )}
                    />
                  </View>
                )}
              />
            )}
          </View>
        ) : (
          <View style={[styles.view, styles.content, { backgroundColor: theme.colors.background }]}>
            <Text>Não há registros para ser exibidos...</Text>
          </View>
        )}
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
  view: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingTop: 10, paddingBottom: 10, justifyContent: 'center' },
  loadingIndicator: { marginTop: 20 },
  categoriaContainer: { marginBottom: 24 },
  categoriaTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 16, marginBottom: 8 },
  productContainer: { marginHorizontal: 8, marginBottom: 16 },
  button: { marginTop: 8 },
});

export default CardapioScreen;