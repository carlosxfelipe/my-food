import React, { useMemo } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { BottomNav, BottomNavItem } from "./BottomNav";

export function BottomTabAdapter({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors, dark } = useTheme();

  const items: BottomNavItem[] = useMemo(
    () =>
      state.routes.map((route) => {
        const { options } = descriptors[route.key];
        const label = (options.tabBarLabel as string) ?? options.title ??
          route.name;

        const activeIcon = (options as any).tabBarIconNameActive ?? "home";
        const inactiveIcon = (options as any).tabBarIconNameInactive ??
          "home-outline";

        return {
          key: route.key,
          label,
          activeIcon,
          inactiveIcon,
          disabled: options.tabBarAccessibilityLabel === "disabled",
        };
      }),
    [state.routes, descriptors],
  );

  const activeKey = state.routes[state.index].key;

  return (
    <BottomNav
      items={items}
      activeKey={activeKey}
      onPress={(key) => {
        const index = state.routes.findIndex((r) => r.key === key);
        const route = state.routes[index];
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });
        if (!event.defaultPrevented) {
          navigation.navigate(route.name as never);
        }
      }}
      backgroundColor={colors.card}
      textColor={dark ? "#fff" : "#000"}
    />
  );
}
