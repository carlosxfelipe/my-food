import { StyleSheet } from "react-native";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";

export function Home() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Tela Inicial</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    marginTop: 10,
  },
});
