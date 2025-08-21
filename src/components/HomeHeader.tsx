import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { Icon } from "../components/Icon";

export type HomeHeaderProps = {
  chips: string[];
  activeTag?: string;
  onPick: (tag: string) => void;
  onClear: () => void;
};

function HomeHeaderBase(
  { chips, activeTag, onPick, onClear }: HomeHeaderProps,
) {
  const onSurface = useThemeColor("onSurface");
  const outline = useThemeColor("outline");
  const surfaceVariant = useThemeColor("surfaceVariant");
  const primary = useThemeColor("primary");
  const onPrimary = useThemeColor("onPrimary");
  const iconColor = useThemeColor("text");

  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ fontSize: 28, fontWeight: "800", color: onSurface }}>
        Olá, Carlos Felipe Araújo 👋
      </Text>
      <Text style={{ fontSize: 14, opacity: 0.8, color: onSurface }}>
        Ofertas e novidades de hoje
      </Text>

      <View style={styles.banner(surfaceVariant)}>
        <Icon
          name="coffee"
          family="material-community"
          size={22}
          color={iconColor}
        />
        <Text style={{ fontWeight: "700", color: onSurface }}>
          Frete grátis acima de R$ 150
        </Text>
      </View>

      {/* chips horizontais (roláveis) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingRight: 8 }}
        style={{ marginTop: 12 }}
      >
        {chips.map((c) => {
          const active = c === activeTag;
          return (
            <Pressable
              key={c}
              onPress={() => (active ? onClear() : onPick(c))}
              style={styles.chip(active, outline, primary)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text
                style={{ fontSize: 12, color: active ? onPrimary : onSurface }}
              >
                #{c}
              </Text>
            </Pressable>
          );
        })}

        {activeTag && (
          <Pressable
            onPress={onClear}
            style={styles.chip(false, outline, "transparent")}
          >
            <Text style={{ fontSize: 12, color: onSurface }}>Limpar</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

export const HomeHeader = React.memo(HomeHeaderBase);

const styles = {
  banner: (bg: string) =>
    ({
      marginTop: 12,
      backgroundColor: bg,
      borderRadius: 12,
      padding: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    }) as const,
  chip: (active: boolean, border: string, bg: string) =>
    ({
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: active ? "transparent" : border,
      backgroundColor: active ? bg : "transparent",
    }) as const,
};
