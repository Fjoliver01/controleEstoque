import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Appbar, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainScreen = ({ navigation }: { navigation: any }) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Bem-vindo" titleStyle={{ color: theme.colors.onPrimary }}/>
      </Appbar.Header>
      <View style={styles.mainButtonsContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('ClienteStack')}
          style={styles.button}
        >
          Acessar Cardápio
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('AdminStack')}
          style={styles.button}
        >
          Administrador
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainButtonsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { marginVertical: 8 },
});

export default MainScreen;
