import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "../components/Icon";

export type BottomNavItem = {
  key: string;
  label: string;
  activeIcon: string;
  inactiveIcon: string;
  disabled?: boolean;
};

type Props = {
  items: BottomNavItem[];
  activeKey: string;
  onPress: (key: string) => void;
  backgroundColor?: string;
  textColor?: string;
};

function withOpacity(color: string, opacity: number = 0.6) {
  if (!color?.startsWith("#")) return color;
  let hex = color.slice(1);
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  if (hex.length !== 6) return color;

  const alpha = Math.round(opacity * 255).toString(16).padStart(2, "0");
  return `#${hex}${alpha}`;
}

export const BottomNav = React.memo(function BottomNav({
  items,
  activeKey,
  onPress,
  backgroundColor = "#FFFFFF",
  textColor = "#000000",
}: Props) {
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[styles.container, { backgroundColor }]}
      accessibilityRole="tablist"
    >
      {items.map((item) => {
        const isActive = item.key === activeKey;
        const color = isActive ? textColor : withOpacity(textColor, 0.6);
        const iconName = isActive ? item.activeIcon : item.inactiveIcon;

        return (
          <TouchableOpacity
            key={item.key}
            style={styles.tab}
            onPress={() => !item.disabled && onPress(item.key)}
            activeOpacity={0.7}
            accessibilityRole="tab"
            accessibilityState={{
              selected: isActive,
              disabled: !!item.disabled,
            }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            disabled={!!item.disabled}
          >
            <Icon name={iconName} color={color} size={24} style={styles.icon} />
            <Text style={[styles.label, { color }]} numberOfLines={1}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // sem height fixa; deixa crescer com a safe area
    minHeight: 60,
    paddingTop: 6,
    paddingBottom: 6, // só espaçamento interno; a safe area é aplicada pelo SafeAreaView
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -2 },
  },
  tab: { flex: 1, alignItems: "center", justifyContent: "center" },
  icon: { marginBottom: 2 },
  label: { fontSize: 11, marginTop: 2 },
});
