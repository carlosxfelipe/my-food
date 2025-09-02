Este é o projeto **My Food**, desenvolvido em
[**React Native**](https://reactnative.dev), utilizando
[`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Primeiros Passos

> **Nota**: Certifique-se de ter concluído o guia
> [Configurar seu Ambiente](https://reactnative.dev/docs/set-up-your-environment)
> antes de prosseguir.

## Etapa 1: Iniciar o Metro

Primeiro, você precisará executar o **Metro**, a ferramenta de build JavaScript
para React Native.

Para iniciar o servidor Metro, execute o seguinte comando a partir da raiz do
seu projeto React Native:

```sh
# Usando npm
npm start

# OU usando Yarn
yarn start
```

## Etapa 2: Construir e rodar seu app

Com o Metro em execução, abra uma nova janela/aba de terminal a partir da raiz
do seu projeto React Native e use um dos seguintes comandos para compilar e
rodar seu aplicativo Android ou iOS:

### Android

```sh
# Usando npm
npm run android

# OU usando Yarn
yarn android
```

### iOS

No iOS, lembre-se de instalar as dependências do CocoaPods (isso só precisa ser
feito no primeiro clone ou após atualizar dependências nativas).

Na primeira vez que você criar um novo projeto, execute o bundler do Ruby para
instalar o próprio CocoaPods:

```sh
bundle install
```

Depois, e sempre que atualizar suas dependências nativas, execute:

```sh
bundle exec pod install
```

Para mais informações, consulte o
[guia de introdução ao CocoaPods](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Usando npm
npm run ios

# OU usando Yarn
yarn ios
```

Se tudo estiver configurado corretamente, você verá seu novo aplicativo rodando
no Emulador Android, no Simulador iOS ou no seu dispositivo conectado.

Essa é uma forma de rodar seu aplicativo --- você também pode compilá-lo
diretamente no Android Studio ou no Xcode.
