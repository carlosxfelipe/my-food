import { StyleSheet } from "react-native";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";

export function Orders() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Tela de Pedidos</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
