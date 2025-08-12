import { StyleSheet, View } from "react-native";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { ProgressBar } from "../../components/ProgressBar";

export function Orders() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Tela de Pedidos</ThemedText>
      <View style={{ marginTop: 30 }} />
      <ProgressBar
        value={60}
        showMarker
        showLabels
        style={{ marginTop: 8 }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
