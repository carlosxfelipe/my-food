import { StyleSheet } from "react-native";
import { ThemedScrollView } from "../../components/ThemedScrollView";
import { ThemedText } from "../../components/ThemedText";

export function Orders() {
  return (
    <ThemedScrollView style={styles.container}>
      <ThemedText type="title">Tela de Pedidos</ThemedText>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
