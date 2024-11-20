import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Appbar, useTheme, Snackbar, ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const theme = useTheme();
  
    const handleLogin = () => {
      if (username === 'admin' && password === 'admin') {
        navigation.navigate('AdminTabs');
      } else {
        setSnackbarMessage('Credenciais inválidas.');
        setSnackbarVisible(true);
      }
    };
  
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>      
        <Appbar.Header>
          <Appbar.Content title="Login Administrador" titleStyle={{ color: theme.colors.onPrimary }} />
        </Appbar.Header>
        <View style={styles.loginContainer}>
          <TextInput
            label="Usuário"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
          />
          <TextInput
            label="Senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />
          <Button mode="contained" onPress={handleLogin} style={styles.button}>Login</Button>
        </View>
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
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: { flex: 1 },
    view: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    content: { borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingTop: 10, paddingBottom: 10, justifyContent: 'center' },
    productContainer: { marginBottom: 16 },
    button: { marginTop: 8 },
    clearCartButton: { marginVertical: 16 },
    mainButtonsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loginContainer: { flex: 1, justifyContent: 'center', padding: 16 },
    input: { marginBottom: 16 },
  });

  export default LoginScreen;