import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import type { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Icon } from "../components/Icon";

type HeaderProps = NativeStackHeaderProps | BottomTabHeaderProps;

export function AppHeader(props: HeaderProps) {
  const { navigation, options } = props as any;
  const back = "back" in props
    ? (props as NativeStackHeaderProps).back
    : undefined;
  const { colors, dark } = useTheme();
  const tint = dark ? "#fff" : "#000";
  const placeholder = useMemo(() => (dark ? "#ffffff99" : "#00000066"), [dark]);

  const cartCount = (options as any)?.cartCount ?? 9;
  const bellCount = (options as any)?.bellCount ?? 9;

  return (
    <SafeAreaView
      edges={["top"]}
      style={[
        styles.container,
        { backgroundColor: colors.card, borderBottomColor: colors.border },
      ]}
    >
      <View style={styles.left}>
        {back
          ? (
            <Pressable onPress={navigation.goBack} hitSlop={8}>
              <Icon
                name="chevron-left"
                size={28}
                color={tint}
                family="material-community"
              />
            </Pressable>
          )
          : <View style={{ width: 28 }} />}
      </View>

      <View
        style={[
          styles.search,
          {
            backgroundColor: dark ? "#ffffff0f" : "#00000008",
            borderColor: colors.border,
          },
        ]}
      >
        <Icon
          name="magnify"
          size={20}
          color={tint}
          family="material-community"
        />
        <TextInput
          placeholder="Buscar"
          placeholderTextColor={placeholder}
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={(e) => {
            const q = e.nativeEvent.text?.trim();
            if (!q) return;
            if (typeof (options as any)?.onSearch === "function") {
              (options as any).onSearch(q);
            }
          }}
        />
      </View>

      <View style={styles.actions}>
        <BadgeIcon
          icon="cart-outline"
          count={cartCount}
          tint={tint}
          onPress={() => navigation.navigate("Orders" as never)}
        />
        <BadgeIcon
          icon="bell-outline"
          count={bellCount}
          tint={tint}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

function BadgeIcon({
  icon,
  count,
  tint,
  onPress,
}: {
  icon: string;
  count: number;
  tint: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.iconWrap}>
      <Pressable onPress={onPress} hitSlop={8}>
        <Icon name={icon} size={22} color={tint} family="material-community" />
      </Pressable>
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {count > 9 ? "+9" : count}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  left: { width: 40, alignItems: "flex-start" },
  search: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginLeft: 4,
    paddingRight: 4,
  },
  iconWrap: { position: "relative" },
  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },
});
