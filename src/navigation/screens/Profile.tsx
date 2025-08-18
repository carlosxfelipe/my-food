import { StyleSheet } from "react-native";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";

export function Profile() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Tela de Perfil</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
