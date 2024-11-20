# Instalação e Execução

## Pré-requisitos

1.  **Node.js** (Recomendado: versão LTS) – Instale através do site oficial.
2.  **Conta Firebase** – Configure o Firestore e o Storage.

## Passo 1: Clonar o repositório

Clone o repositório para sua máquina local:

```bash
git clone <URL_DO_REPOSITÓRIO>
```

Acesse a pasta do projeto:

```bash
cd <NOME_DO_PROJETO>
```

## Passo 2: Instalar dependências

Instale todas as dependências necessárias, incluindo o Expo como dependência local:

```bash
npm install expo
npm install
```

## Passo 3: Configurar o Firebase

1. Acesse o Firebase Console e crie um novo projeto.
2. Configure os seguintes serviços:


    - Firestore Database
    - Storage

3. Obtenha as configurações do Firebase:


    - No Firebase Console, clique em Configurações do Projeto > Suas Aplicações > Adicionar App Web.
    - Copie as chaves de configuração fornecidas.

4. No arquivo src/config/firebaseConfig.ts, cole as chaves no formato abaixo:

```ts
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
};

export default firebaseConfig;
```

## Passo 4: Executar o projeto

Para iniciar o aplicativo em ambiente de desenvolvimento, use o Expo local:

```bash
npx expo start
```

## Passo 5: Testar o aplicativo

1. Escaneie o QR Code exibido no terminal usando o app Expo Go (disponível na Play Store e App Store).
2. O aplicativo será carregado no seu dispositivo.

## Observações

- Certifique-se de que o Firestore e o Storage estão devidamente configurados no console do Firebase.
- Para builds de produção, verifique as configurações no arquivo app.json para adicionar as permissões e configurações necessárias.
