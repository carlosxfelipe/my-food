# Pacotes necessários para Bottom Tab Navigator (React Navigation)

## 1. Pacotes principais do React Navigation

**Usando Yarn**

```bash
yarn add @react-navigation/native
yarn add @react-navigation/bottom-tabs
yarn add @react-navigation/native-stack
yarn add @react-navigation/elements
```

**Usando NPM**

```bash
npm install @react-navigation/native
npm install @react-navigation/bottom-tabs
npm install @react-navigation/native-stack
npm install @react-navigation/elements
```

## 2. Dependências nativas obrigatórias

**Usando Yarn**

```bash
yarn add react-native-screens react-native-safe-area-context react-native-gesture-handler
```

**Usando NPM**

```bash
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler
```

---

### Observações importantes

- **react-native-reanimated** não é obrigatório, pois seu `BottomNav` é
  customizado e o `native-stack` usa animações nativas.
- `react-native-gesture-handler` é necessário pois o
  `@react-navigation/bottom-tabs` e o `@react-navigation/native-stack` usam
  gestos para navegação.
- `react-native-screens` melhora a performance e é usado internamente pelo
  `native-stack`.
- `react-native-safe-area-context` é essencial para lidar com áreas seguras
  (notch, bordas arredondadas, etc.).
