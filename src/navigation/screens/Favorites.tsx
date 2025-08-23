import React, { useLayoutEffect, useMemo } from "react";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { useThemeColor } from "../../hooks/useThemeColor";
import { ProductCard } from "../../components/ProductCard";
import { Icon } from "../../components/Icon";
import { MOCK_PRODUCTS, Product } from "../../data/products";
import { useFavorites } from "../../state/favorites";
import { useCart } from "../../state/cart";
import { BRL } from "../../utils/format";

const ItemSeparator = () => <View style={styles.separator} />;

export function Favorites() {
  const navigation = useNavigation<
    NavigationProp<ReactNavigation.RootParamList>
  >();

  const primary = useThemeColor("primary");
  const onPrimary = useThemeColor("onPrimary");
  const bg = useThemeColor("background");
  const card = useThemeColor("surface");
  const outline = useThemeColor("outline");
  const text = useThemeColor("text");

  const { ids, toggle, count } = useFavorites();
  const { qty, add, inc, dec } = useCart();

  const items: Product[] = useMemo(() => {
    if (!ids.size) return [];
    const set = ids;
    return MOCK_PRODUCTS.filter((p) => set.has(p.id));
  }, [ids]);

  useLayoutEffect(() => {
    navigation.setOptions?.({
      title: count > 0 ? `Favoritos (${count})` : "Favoritos",
    } as any);
  }, [navigation, count]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, p) => acc + p.price * (qty[p.id] ?? 0), 0);
  }, [items, qty]);

  const renderItem: ListRenderItem<Product> = ({ item }) => {
    const q = qty[item.id] ?? 0;
    return (
      <View style={{ flex: 1 }}>
        <Pressable
          onPress={() => toggle(item.id)}
          hitSlop={8}
          style={[styles.favBtn, { backgroundColor: primary }]}
          accessibilityLabel={ids.has(item.id)
            ? "Remover dos favoritos"
            : "Adicionar aos favoritos"}
        >
          <Icon
            name={ids.has(item.id) ? "heart" : "heart-outline"}
            family="material-community"
            size={18}
            color={onPrimary}
          />
        </Pressable>

        <ProductCard
          product={item}
          quantity={q}
          onAdd={() => add(item.id, item.stock)}
          onIncrease={() => inc(item.id, item.stock)}
          onDecrease={() => dec(item.id)}
          onPress={() =>
            (navigation as any).navigate("ProductDetails", { id: item.id })}
          style={{ flex: 1 }}
        />
      </View>
    );
  };

  if (items.length === 0) {
    return (
      <ThemedView style={[styles.emptyWrap, { backgroundColor: bg }]}>
        <Icon
          name="heart-off"
          family="material-community"
          size={48}
          color={outline}
        />
        <ThemedText type="title" style={{ marginTop: 8, textAlign: "center" }}>
          Nada por aqui ainda
        </ThemedText>
        <ThemedText style={{ marginTop: 6, textAlign: "center", opacity: 0.9 }}>
          Toque no coração de um produto para favoritá-lo.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columns}
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
      />

      <View
        style={[
          styles.bar,
          { backgroundColor: card, borderColor: outline },
        ]}
        accessibilityLabel={`Subtotal no carrinho dos favoritos: ${
          BRL.format(
            subtotal,
          )
        }`}
      >
        <View style={styles.barLeft}>
          <Icon
            name="cart-outline"
            size={20}
            color={text}
            family="material-community"
          />
          <Text style={[styles.barText, { color: text }]}>
            Subtotal (no carrinho)
          </Text>
        </View>
        <Text style={[styles.barValue, { color: text }]}>
          {BRL.format(subtotal)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 12 },
  listContent: { paddingTop: 12, paddingBottom: 96, gap: 12 },
  columns: { gap: 12 },
  separator: { height: 12 },
  emptyWrap: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  favBtn: {
    position: "absolute",
    zIndex: 2,
    right: 8,
    top: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  barLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  barText: { fontSize: 13, fontWeight: "600" },
  barValue: { fontSize: 16, fontWeight: "800" },
});
