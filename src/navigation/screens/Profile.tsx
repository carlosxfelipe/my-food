import { StaticScreenProps } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";

type Props = StaticScreenProps<{
  user?: string;
}>;

export function Profile({ route }: Props) {
  const rawUser = route?.params?.user;

  const lowercaseWords = ["de", "da", "do", "das", "dos", "e"];

  const user = rawUser
    ? rawUser
      .split(" ")
      .map((word, index) => {
        const lower = word.toLowerCase();
        if (index > 0 && lowercaseWords.includes(lower)) {
          return lower;
        }
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join(" ")
    : "???";

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Perfil de {user}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
