import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { useThemeColor } from "../../hooks/useThemeColor";
import { Product, ProductCard } from "../../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "../../components/Icon";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "p-101",
    name: "Café Especial Torrado 250g",
    sku: "CAF-250-ESP",
    description: "Blend 100% arábica com notas de chocolate e caramelo.",
    price: 34.9,
    image:
      "https://images.unsplash.com/photo-1518057111178-44a106bad636?q=80&w=1200&auto=format&fit=crop",
    rating: 4.7,
    stock: 42,
    tags: ["novo", "premium"],
  },
  {
    id: "p-102",
    name: "Chá Verde Matcha 100g",
    sku: "CHA-MATCHA-100",
    description: "Matcha cerimonial moído a pedra, ideal para lattes.",
    price: 59.9,
    image: "https://images.pexels.com/photos/734983/pexels-photo-734983.jpeg",
    rating: 4.5,
    stock: 18,
    tags: ["orgânico"],
  },
  {
    id: "p-103",
    name: "Cafeteira Prensa Francesa 600ml",
    sku: "PRENSA-600",
    description: "Vidro borossilicato com malha de aço inoxidável.",
    price: 119.9,
    image:
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1200&auto=format&fit=crop",
    rating: 4.2,
    stock: 7,
    tags: ["acessório"],
  },
  {
    id: "p-104",
    name: "Biscoito Amanteigado 200g",
    sku: "BIS-AMT-200",
    description: "Clássico amanteigado com toque de baunilha.",
    price: 14.5,
    image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg",
    rating: 4.0,
    stock: 0,
    tags: ["indisponível"],
  },
  {
    id: "p-106",
    name: "Cupcake de Chocolate com Caramelo",
    sku: "CUP-CHOC-CAR-1",
    description:
      "Massa de chocolate fofinha com cobertura cremosa de chocolate e caramelo.",
    price: 9.9,
    image: "https://images.pexels.com/photos/635409/pexels-photo-635409.jpeg",
    rating: 4.8,
    stock: 32,
    tags: ["doce", "confeitaria", "novo"],
  },
];

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const ItemSeparator = () => <View style={styles.separator} />;

export function Home() {
  const navigation = useNavigation();
  // q = query efetiva (debounced)
  // rawQ = query imediata vinda do header
  const [rawQ, setRawQ] = useState("");
  const [q, setQ] = useState("");
  const [qtyById, setQtyById] = useState<Record<string, number>>({});

  const bg = useThemeColor("background");
  const card = useThemeColor("surface");
  const outline = useThemeColor("outline");
  const textColor = useThemeColor("text");

  // conecta a barra de busca do Header a esta tela
  useLayoutEffect(() => {
    navigation.setOptions?.({
      onChangeQuery: (value: string) => setRawQ(value ?? ""),
      onSearch: (query: string) => setRawQ(query ?? ""),
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
    if (query.length < 2) return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter((p) =>
      [p.name, p.sku].some((s) => s?.toLowerCase().includes(query))
    );
  }, [q]);

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
        style={{ flex: 1 }}
      />
    );
  };

  const keyExtractor = (item: Product) => item.id;

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
          <ThemedText type="title">Tela Inicial</ThemedText>
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
