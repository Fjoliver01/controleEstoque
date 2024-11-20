import React from 'react';
import CadastroProdutosScreen from './src/screens/CadastroProdutosScreen';
import { Provider as PaperProvider, MD3LightTheme  } from 'react-native-paper';
import CardapioScreen from './src/screens/CardapioScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';
import { CartProvider } from './src/contexts/CartContext';
import MainScreen from './src/screens/MainScreen';
import AppNavigator from './src/navigation/AppNavigator';

const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#FF9A3E', // Cor primária personalizada
    background: '#ffffff', // Cor de fundo personalizada
    surface: '#302238',
    text: '#000000',
    onPrimary: '#ffffff',
  },
};

const App = () => {
  return (
    <CartProvider>
      <PaperProvider theme={customTheme}>
          <AppNavigator />
      </PaperProvider>
    </CartProvider>
  );
};

export default App;
