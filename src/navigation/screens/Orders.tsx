import React, { useMemo } from "react";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedButton } from "../../components/ThemedButton";
import { useThemeColor } from "../../hooks/useThemeColor";
import { ProductCard } from "../../components/ProductCard";
import { MOCK_PRODUCTS, Product } from "../../data/products";
import { useCart } from "../../state/cart";
import { BRL } from "../../utils/format";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type CartItem = Product & { quantity: number };

const ItemSeparator = () => <View style={styles.separator} />;

export function Orders() {
  const navigation = useNavigation<
    NavigationProp<ReactNavigation.RootParamList>
  >();
  const { qty, add, inc, dec, clear } = useCart();

  const bg = useThemeColor("background");
  const card = useThemeColor("surface");
  const outline = useThemeColor("outline");
  const text = useThemeColor("text");

  const items: CartItem[] = useMemo(() => {
    return Object.entries(qty)
      .map(([id, q]) => {
        const p = MOCK_PRODUCTS.find((pp) => pp.id === id);
        if (!p || q <= 0) return null;
        return { ...p, quantity: q };
      })
      .filter(Boolean) as CartItem[];
  }, [qty]);

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + it.price * it.quantity, 0),
    [items],
  );

  const renderItem: ListRenderItem<CartItem> = ({ item }) => (
    <ProductCard
      product={item}
      quantity={item.quantity}
      onAdd={() => add(item.id, item.stock)}
      onIncrease={() => inc(item.id, item.stock)}
      onDecrease={() => dec(item.id)}
      onPress={() =>
        (navigation as any).navigate("ProductDetails", { id: item.id })}
      style={{ flex: 1 }}
    />
  );

  if (items.length === 0) {
    return (
      <ThemedView style={[styles.emptyWrap, { backgroundColor: bg }]}>
        <ThemedText type="title" style={{ textAlign: "center" }}>
          Seu carrinho está vazio
        </ThemedText>
        <ThemedText style={{ marginTop: 8, textAlign: "center" }}>
          Adicione itens na tela “Início”.
        </ThemedText>
        <ThemedButton
          title="Explorar produtos"
          onPress={() => {
            const root = (navigation as any).getParent?.() ?? navigation;
            root.navigate("HomeTabs" as never, { screen: "Home" } as never);
          }}
          buttonStyle={{ marginTop: 16, alignSelf: "center" }}
        />
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
          styles.checkoutBar,
          { backgroundColor: card, borderColor: outline },
        ]}
        accessibilityLabel={`Total do carrinho ${BRL.format(subtotal)}`}
      >
        <View style={styles.totals}>
          <Text style={[styles.totalLabel, { color: text }]}>Total</Text>
          <Text style={[styles.totalValue, { color: text }]}>
            {BRL.format(subtotal)}
          </Text>

          <Pressable onPress={clear} hitSlop={8} style={{ marginLeft: 12 }}>
            <Text style={[styles.clearText, { color: outline }]}>Limpar</Text>
          </Pressable>
        </View>

        <ThemedButton
          title={`Finalizar pedido (${items.length})`}
          onPress={() => {
            console.log("checkout");
          }}
          buttonStyle={{ paddingHorizontal: 18 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 12 },
  listContent: { paddingTop: 12, paddingBottom: 120, gap: 12 },
  columns: { gap: 12 },
  emptyWrap: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  totals: { flexDirection: "row", alignItems: "center" },
  totalLabel: { fontSize: 14, fontWeight: "600", marginRight: 8 },
  totalValue: { fontSize: 16, fontWeight: "800" },
  clearText: { fontSize: 12 },
  separator: { height: 12 },
});
