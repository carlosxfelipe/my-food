import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Text
        style={{
          color: isDarkMode ? "#fff" : "#000",
          fontSize: 20,
          textAlign: "center",
          marginTop: 50,
        }}
      >
        Bem-vindo ao MyFood!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
