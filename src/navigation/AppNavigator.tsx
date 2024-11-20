import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from '../screens/MainScreen';
import CardapioScreen from '../screens/CardapioScreen';
import CarrinhoScreen from '../screens/CarrinhoScreen';
import LoginScreen from '../screens/LoginScreen';
import CadastroProdutosScreen from '../screens/CadastroProdutosScreen';
import { MaterialIcons } from '@expo/vector-icons';
import PedidosScreen from '../screens/PedidosScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ClienteStack = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        const iconName: string =
        route.name === 'Cardapio' ? 'restaurant-menu' :
        route.name === 'Carrinho' ? 'shopping-cart' :
        'help-outline';

        return <MaterialIcons name={iconName as keyof typeof MaterialIcons.glyphMap} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FF9A3E',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Cardapio" component={CardapioScreen} options={{ headerShown: false}} />
    <Tab.Screen name="Carrinho" component={CarrinhoScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const AdminTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        const iconName: string =
          route.name === 'CadastroProdutos' ? 'add-box' :
          route.name === 'Pedidos' ? 'pending-actions' :
          'help-outline';

        return <MaterialIcons name={iconName as keyof typeof MaterialIcons.glyphMap} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FF9A3E',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen
      name="CadastroProdutos"
      component={CadastroProdutosScreen}
      options={{ headerShown: false, title: 'Cadastro' }}
    />
    <Tab.Screen
      name="Pedidos"
      component={PedidosScreen}
      options={{ headerShown: false, title: 'Pedidos' }}
    />
  </Tab.Navigator>
);

const AdminStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AdminTabs" component={AdminTabs} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ClienteStack" component={ClienteStack} options={{ headerShown: false }} />
      <Stack.Screen name="AdminStack" component={AdminStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
