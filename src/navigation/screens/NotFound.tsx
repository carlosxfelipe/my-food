import { Button } from "@react-navigation/elements";
import { StyleSheet } from "react-native";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";

export function NotFound() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">404</ThemedText>
      <Button screen="HomeTabs" style={styles.button}>
        Ir para Início
      </Button>
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
