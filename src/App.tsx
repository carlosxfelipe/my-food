import { StatusBar, View } from "react-native";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";
import { Navigation } from "./navigation";
import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

function AppWithProviders() {
  const { theme } = useTheme();
  const navTheme: Theme = theme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <View style={{ flex: 1, backgroundColor: navTheme.colors.card }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <Navigation
        theme={navTheme}
        linking={{
          enabled: "auto",
          prefixes: [
            // Change the scheme to match your app's scheme defined in app.json
            "helloworld://",
          ],
        }}
        onReady={() => {
          // SplashScreen.hideAsync();
        }}
      />
    </View>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppWithProviders />
    </ThemeProvider>
  );
}
