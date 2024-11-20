import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';
import { Produto } from '../models/Produto';

interface Props {
  produto: Produto;
  quantidade?: number; // Nova propriedade opcional para a quantidade
  onEditPress?: (produto: Produto) => void;
  onDeletePress?: (id: string) => void;
  isCardapio?: boolean;
}

const ProdutoCard: React.FC<Props> = ({ produto, quantidade, onEditPress, onDeletePress, isCardapio = false }) => {
  const theme = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Title
        title={produto.nome}
        titleStyle={{ color: theme.colors.onPrimary }}
        right={(props) =>
          !isCardapio && (
            <View style={styles.actionIcons}>
              {onEditPress && (
                <IconButton
                  iconColor={theme.colors.primary}
                  {...props}
                  icon="pencil"
                  onPress={() => onEditPress(produto)}
                />
              )}
              {onDeletePress && (
                <IconButton
                  iconColor={theme.colors.primary}
                  {...props}
                  icon="delete"
                  onPress={() => onDeletePress(produto.id!)}
                />
              )}
            </View>
          )
        }
      />
      <Card.Content>
        <Text style={{ color: theme.colors.onPrimary, marginTop: 8 }}>
          Preço: R$ {produto.preco.toFixed(2)}
        </Text>
        {!isCardapio ? 
          <Text style={{ color: theme.colors.onPrimary, marginTop: 8 }}>
            Categoria: {produto.categoria}
          </Text>
         : null}
         {!isCardapio ? 
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{ color: theme.colors.onPrimary, marginTop: 8 }}>
              Estoque: {produto.estoque}
            </Text>
            {produto.estoque <= 5 ? <IconButton
                size={15}
                iconColor={theme.colors.primary}
                icon="alert"
            /> : null}
          </View>
         : null}
          {!isCardapio ? 
          <Text style={{ color: theme.colors.onPrimary, marginTop: 8 }}>
            Descrição: {produto.descricao}
          </Text>
          
         : null}
        {quantidade && (
          <Text style={[styles.quantidade, { color: theme.colors.primary }]}>
            Quantidade: {quantidade}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { margin: 8, marginLeft: 18, marginRight: 18, minWidth: 200 },
  actionIcons: { flexDirection: 'row' },
  image: { width: '100%', height: 150, resizeMode: 'cover', borderRadius: 8, marginVertical: 8 },
  quantidade: { fontWeight: 'bold', marginTop: 20 },
});

export default ProdutoCard;
