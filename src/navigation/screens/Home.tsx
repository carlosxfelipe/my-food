import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { useThemeColor } from "../../hooks/useThemeColor";
import { ProductCard } from "../../components/ProductCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Icon } from "../../components/Icon";
import { HomeHeader } from "../../components/HomeHeader";
import { MOCK_PRODUCTS, Product } from "../../data/products";
import { BRL } from "../../utils/format";

const ItemSeparator = () => <View style={styles.separator} />;

export function Home() {
  const navigation = useNavigation<
    NavigationProp<ReactNavigation.RootParamList>
  >();
  // q = query efetiva (debounced)
  // rawQ = query imediata vinda do header
  const [rawQ, setRawQ] = useState("");
  const [q, setQ] = useState("");
  const [qtyById, setQtyById] = useState<Record<string, number>>({});
  const [tag, setTag] = useState<string | undefined>(undefined);

  const bg = useThemeColor("background");
  const card = useThemeColor("surface");
  const outline = useThemeColor("outline");
  const textColor = useThemeColor("text");

  // conecta a barra de busca do Header a esta tela
  useLayoutEffect(() => {
    navigation.setOptions?.({
      onChangeQuery: (value: string) => {
        setTag(undefined);
        setRawQ(value ?? "");
      },
      onSearch: (query: string) => {
        setTag(undefined);
        setRawQ(query ?? "");
      },
      cartCount: Object.values(qtyById).reduce((a, b) => a + b, 0),
    } as any);

    return () => {
      navigation.setOptions?.({
        onChangeQuery: undefined,
        onSearch: undefined,
      } as any);
    };
  }, [navigation, qtyById]);

  // debounce: espera 300ms antes de aplicar no filtro real
  useEffect(() => {
    const id = setTimeout(() => setQ(rawQ), 300);
    return () => clearTimeout(id);
  }, [rawQ]);

  const data = useMemo(() => {
    const query = q.trim().toLowerCase();
    let base = MOCK_PRODUCTS;

    if (tag) {
      base = base.filter((p) =>
        (p.tags ?? []).map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      );
    }

    if (query.length >= 2) {
      base = base.filter((p) =>
        [p.name, p.sku].some((s) => s?.toLowerCase().includes(query))
      );
    }
    return base;
  }, [q, tag]);

  const subtotal = useMemo(() => {
    return Object.entries(qtyById).reduce((acc, [id, qty]) => {
      const prod = MOCK_PRODUCTS.find((p) => p.id === id);
      return acc + (prod ? prod.price * qty : 0);
    }, 0);
  }, [qtyById]);

  const renderItem: ListRenderItem<Product> = ({ item }) => {
    const qty = qtyById[item.id] ?? 0;
    return (
      <ProductCard
        product={item}
        quantity={qty}
        onAdd={() => setQtyById((m) => ({ ...m, [item.id]: 1 }))}
        onIncrease={() =>
          setQtyById((m) => ({
            ...m,
            [item.id]: Math.min((m[item.id] ?? 0) + 1, item.stock),
          }))}
        onDecrease={() =>
          setQtyById((m) => {
            const cur = (m[item.id] ?? 0) - 1;
            const next = { ...m } as Record<string, number>;
            if (cur <= 0) delete next[item.id];
            else next[item.id] = cur;
            return next;
          })}
        onPress={() =>
          (navigation as any).navigate("ProductDetails", { id: item.id })}
        style={{ flex: 1 }}
      />
    );
  };

  const keyExtractor = (item: Product) => item.id;

  const chips = useMemo(
    () =>
      Array.from(new Set(MOCK_PRODUCTS.flatMap((p) => p.tags ?? []))).filter(
        Boolean,
      ),
    [],
  );

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columns}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <HomeHeader
            chips={chips}
            activeTag={tag}
            onPick={(picked) => {
              setRawQ("");
              setQ("");
              setTag(picked);
            }}
            onClear={() => {
              setTag(undefined);
              setRawQ("");
              setQ("");
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ThemedText style={{ marginTop: 24 }}>
            Nenhum produto encontrado para “{q}”.
          </ThemedText>
        }
      />

      <View
        style={[styles.cartBar, {
          backgroundColor: card,
          borderColor: outline,
        }]}
        accessibilityLabel={`Subtotal do carrinho ${BRL.format(subtotal)}`}
      >
        <View style={styles.cartLeft}>
          <Icon
            name="cart-outline"
            size={22}
            color={textColor}
            family="material-community"
          />
          <Text style={[styles.cartText, { color: textColor }]}>Subtotal</Text>
        </View>
        <Text style={[styles.cartValue, { color: textColor }]}>
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
  cartBar: {
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
  cartLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  cartText: { fontSize: 14, fontWeight: "600" },
  cartValue: { fontSize: 16, fontWeight: "800" },
});
