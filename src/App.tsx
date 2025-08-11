import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";
import { Navigation } from "./navigation";
import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import SystemNavigationBar from "react-native-system-navigation-bar";

function AppWithProviders() {
  const { theme } = useTheme();
  const navTheme: Theme = theme === "dark" ? DarkTheme : DefaultTheme;

  useEffect(() => {
    if (Platform.OS !== "android") return;

    SystemNavigationBar.setNavigationColor(
      navTheme.colors.card,
      theme === "dark" ? "light" : "dark",
      "navigation",
    );
  }, [theme, navTheme.colors.card]);

  return (
    <>
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
