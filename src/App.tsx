import { StatusBar, Text } from "react-native";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";

function AppWithProviders() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <Text
        style={{
          color: theme === "dark" ? "#fff" : "#000",
          fontSize: 20,
          textAlign: "center",
          marginTop: 50,
        }}
      >
        Bem-vindo ao MyFood!
      </Text>
    </>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppWithProviders />
    </ThemeProvider>
  );
}
