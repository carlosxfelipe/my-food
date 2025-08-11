## 📦 Instalação do react-native-safe-area-context no React Native

### 1. Instale as dependências

**Usando Yarn**

```bash
yarn add react-native-safe-area-context
npx pod-install # ⚠️ Chamar `pod install` está deprecated no React Native. Use `yarn ios` (Community CLI) ou `npx expo run:ios` (Expo).
```

**Usando NPM**

```bash
npm install react-native-safe-area-context
npx pod-install # ⚠️ Chamar `pod install` está deprecated no React Native. Use `npm run ios` (Community CLI) ou `npx expo run:ios` (Expo).
```

---

### 2. Uso no App

```tsx
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* seu app aqui */}
    </SafeAreaProvider>
  );
}
```

---

✅ **Pronto!** Agora seu app está configurado para lidar com áreas seguras no
Android e iOS (levando em conta notch, status bar e áreas de gestos).
