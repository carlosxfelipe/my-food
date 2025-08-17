import React, { useLayoutEffect, useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  NavigationProp,
  StaticScreenProps,
  useNavigation,
} from "@react-navigation/native";
import { useThemeColor } from "../../hooks/useThemeColor";
import { Icon } from "../../components/Icon";
import { MOCK_PRODUCTS, Product } from "../../data/products";
import { BRL } from "../../utils/format";

type Props = StaticScreenProps<{
  id: string;
}>;

export function ProductDetails({ route }: Props) {
  const { id } = route.params;
  const product = useMemo<Product | undefined>(
    () => MOCK_PRODUCTS.find((p) => p.id === id),
    [id],
  );

  const bg = useThemeColor("background");
  const onSurface = useThemeColor("onSurface");
  const outline = useThemeColor("outline");
  const primary = useThemeColor("primary");
  const onPrimary = useThemeColor("onPrimary");
  const star = useThemeColor("star");

  const navigation = useNavigation<
    NavigationProp<ReactNavigation.RootParamList, "ProductDetails">
  >();

  useLayoutEffect(() => {
    if (product) {
      navigation.setOptions?.({
        title: product.name,
      } as any);
    }
  }, [navigation, product]);

  if (!product) {
    return (
      <View style={[styles.center, { backgroundColor: bg }]}>
        <Text style={{ color: onSurface }}>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: bg }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
        {!!product.tags?.length && (
          <View style={styles.tagsRow}>
            {product.tags.map((t) => (
              <View key={t} style={[styles.tag, { backgroundColor: primary }]}>
                <Text style={[styles.tagText, { color: onPrimary }]}>{t}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <Text style={[styles.title, { color: onSurface }]}>{product.name}</Text>
      <Text style={[styles.sku, { color: outline }]}>SKU: {product.sku}</Text>

      {!!product.rating && (
        <View
          style={styles.rating}
          accessibilityLabel={`Avaliação ${product.rating.toFixed(1)} de 5`}
        >
          {Array.from({ length: 5 }).map((_, i) => {
            const full = Math.floor(product.rating ?? 0);
            const half = (product.rating ?? 0) - full >= 0.5;
            let icon: string;
            if (i < full) icon = "star";
            else if (i === full && half) icon = "star-half-full";
            else icon = "star-outline";
            return (
              <Icon
                key={i}
                name={icon}
                family="material-community"
                size={18}
                color={icon === "star-outline" ? outline : star}
                style={{ marginRight: 2 }}
              />
            );
          })}
          <Text style={[styles.ratingText, { color: outline }]}>
            {product.rating?.toFixed(1)}
          </Text>
        </View>
      )}

      <Text style={[styles.price, { color: onSurface }]}>
        {BRL.format(product.price)}
      </Text>
      {!!product.description && (
        <Text style={[styles.desc, { color: onSurface }]}>
          {product.description}
        </Text>
      )}

      <Text style={[styles.stock, { color: outline }]}>
        {product.stock} em estoque
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  imageWrap: { borderRadius: 14, overflow: "hidden" },
  image: { width: "100%", aspectRatio: 4 / 3 },
  tagsRow: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    gap: 6,
  },
  tag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  tagText: { fontSize: 11, fontWeight: "600" },
  title: { fontSize: 22, fontWeight: "800", lineHeight: 26, marginTop: 6 },
  sku: { fontSize: 12 },
  rating: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  ratingText: { fontSize: 12, marginLeft: 6 },
  price: { fontSize: 24, fontWeight: "800", marginTop: 6 },
  desc: { fontSize: 14, lineHeight: 20, opacity: 0.95 },
  stock: { fontSize: 12, marginTop: 4 },
});
