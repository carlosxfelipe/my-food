// import { Button } from "@react-navigation/elements";
import { StyleSheet } from "react-native";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedButton } from "../../components/ThemedButton";
import { type NavigationProp, useNavigation } from "@react-navigation/native";

export function Home() {
  const navigation = useNavigation<
    NavigationProp<ReactNavigation.RootParamList>
  >();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Tela Inicial</ThemedText>

      {
        /* <Button
        screen="Profile"
        params={{ user: "carlos felipe" }}
        style={styles.button}
      >
        Ir para Perfil
      </Button> */
      }

      {
        /* <ThemedButton
        title="Ir para Perfil"
        onPress={() =>
          navigation.navigate("Profile", { user: "carlos felipe" })}
        buttonStyle={styles.button}
      /> */
      }

      {
        /* <Button screen="Settings" style={styles.button}>
        Ir para Configurações
      </Button> */
      }

      <ThemedButton
        title="Ir para Configurações"
        onPress={() => navigation.navigate("Settings")}
        buttonStyle={styles.button}
      />
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
