import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "../components/Icon";
import { useThemeColor } from "../hooks/useThemeColor";

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
  backgroundColor,
  textColor,
}: Props) {
  const themeBottom = useThemeColor("bottom");
  const themeOutline = useThemeColor("outline");
  const themeText = useThemeColor("text");
  const themePrimary = useThemeColor("primary");

  const barBg = backgroundColor ?? themeBottom;
  const baseText = textColor ?? themeText;
  const borderTopCol = withOpacity(themeOutline, 0.4);

  const activeIndicatorBg = withOpacity(themePrimary, 0.16);
  const activeContent = themePrimary;
  const inactiveContent = withOpacity(baseText, 0.74);

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[styles.container, {
        backgroundColor: barBg,
        borderTopColor: borderTopCol,
      }]}
      accessibilityRole="tablist"
    >
      {items.map((item) => {
        const isActive = item.key === activeKey;
        const iconName = isActive ? item.activeIcon : item.inactiveIcon;
        const color = isActive ? activeContent : inactiveContent;

        return (
          <Pressable
            key={item.key}
            style={styles.tab}
            onPress={() => !item.disabled && onPress(item.key)}
            android_ripple={{
              color: withOpacity(themePrimary, 0.12),
              radius: 28,
            }}
            disabled={!!item.disabled}
            accessibilityRole="tab"
            accessibilityState={{
              selected: isActive,
              disabled: !!item.disabled,
            }}
            hitSlop={8}
          >
            <View style={styles.iconLine}>
              {isActive && (
                <View
                  pointerEvents="none"
                  style={[styles.activeIndicator, {
                    backgroundColor: activeIndicatorBg,
                  }]}
                />
              )}
              <Icon
                name={iconName}
                color={color}
                size={24}
                style={styles.icon}
              />
            </View>
            <Text style={[styles.label, { color }]} numberOfLines={1}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    minHeight: 60,
    paddingTop: 6,
    paddingBottom: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: -2 },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  iconLine: {
    height: 32,
    minWidth: 64,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  activeIndicator: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
  },
  icon: { marginBottom: 2 },
  label: { fontSize: 11, marginTop: 2, fontWeight: "600" },
});
