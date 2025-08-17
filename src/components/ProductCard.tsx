import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { Icon } from "./Icon";
import { Product } from "../data/products";
import { BRL } from "../utils/format";

export type ProductCardProps = {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onPress?: () => void;
  style?: ViewStyle;
};

export function ProductCard({
  product,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
  onPress,
  style,
}: ProductCardProps) {
  const surface = useThemeColor("surface");
  const onSurface = useThemeColor("onSurface");
  const outline = useThemeColor("outline");
  const surfaceVariant = useThemeColor("surfaceVariant");
  const primary = useThemeColor("primary");
  const onPrimary = useThemeColor("onPrimary");
  const text = useThemeColor("text");
  const star = useThemeColor("star");

  const outOfStock = product.stock === 0;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: surface,
          borderColor: outline,
          opacity: pressed ? 0.98 : 1,
        },
        style,
      ]}
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
        {outOfStock && (
          <View style={styles.unavailable}>
            <Text style={styles.unavailableText}>Indisponível</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: onSurface }]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[styles.sku, { color: outline }]} numberOfLines={1}>
          SKU: {product.sku}
        </Text>
        {!!product.description && (
          <Text style={[styles.desc, { color: text }]} numberOfLines={2}>
            {product.description}
          </Text>
        )}

        <View style={styles.priceBlock}>
          <Text style={[styles.price, { color: onSurface }]}>
            {BRL.format(product.price)}
          </Text>
          <Text style={[styles.stock, { color: outline }]}>
            {product.stock} em estoque
          </Text>
        </View>

        {!!product.rating && (
          <View
            style={styles.rating}
            accessibilityLabel={`Avaliação ${product.rating.toFixed(1)} de 5`}
          >
            {Array.from({ length: 5 }).map((_, i) => {
              const fullStars = Math.floor(product.rating ?? 0);
              const hasHalf = (product.rating ?? 0) - fullStars >= 0.5;
              let iconName: string;
              if (i < fullStars) iconName = "star";
              else if (i === fullStars && hasHalf) iconName = "star-half-full";
              else iconName = "star-outline";
              return (
                <Icon
                  key={i}
                  name={iconName}
                  family="material-community"
                  size={16}
                  color={iconName === "star-outline" ? outline : star}
                  style={{ marginRight: 2 }}
                />
              );
            })}
            <Text style={[styles.ratingText, { color: outline }]}>
              {product.rating?.toFixed(1)}
            </Text>
          </View>
        )}
      </View>

      <View style={[styles.footer, { backgroundColor: surfaceVariant }]}>
        {quantity === 0
          ? (
            <Pressable
              onPress={onAdd}
              disabled={outOfStock}
              style={({ pressed }) => [
                styles.addBtn,
                {
                  backgroundColor: primary,
                  opacity: outOfStock ? 0.5 : pressed ? 0.92 : 1,
                },
              ]}
              android_ripple={{ color: "#ffffff22" }}
            >
              <Icon
                name="cart-outline"
                size={18}
                color={onPrimary}
                family="material-community"
              />
              <Text style={[styles.addText, { color: onPrimary }]}>
                Adicionar
              </Text>
            </Pressable>
          )
          : (
            <View style={styles.qtyRow}>
              <Pressable
                onPress={onDecrease}
                style={({ pressed }) => [
                  styles.qtyBtn,
                  { borderColor: outline, opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <Icon
                  name="minus"
                  size={18}
                  color={onSurface}
                  family="material-community"
                />
              </Pressable>
              <Text style={[styles.qtyText, { color: onSurface }]}>
                {quantity}
              </Text>
              <Pressable
                onPress={onIncrease}
                disabled={quantity >= product.stock}
                style={({ pressed }) => [
                  styles.qtyBtn,
                  { borderColor: outline, opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <Icon
                  name="plus"
                  size={18}
                  color={onSurface}
                  family="material-community"
                />
              </Pressable>
            </View>
          )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    overflow: "hidden",
  },
  imageWrap: { position: "relative", aspectRatio: 4 / 3 },
  image: { width: "100%", height: "100%" },
  tagsRow: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    gap: 6,
  },
  tag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  tagText: { fontSize: 11, fontWeight: "600" },
  unavailable: {
    position: "absolute",
    // inset: 0 as any,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000055",
  },
  unavailableText: { color: "#fff", fontWeight: "700" },
  content: { padding: 10, gap: 4, flexGrow: 1 },
  title: { fontSize: 14, fontWeight: "700", lineHeight: 18, minHeight: 36 },
  sku: { fontSize: 12, lineHeight: 16, minHeight: 16 },
  desc: { fontSize: 12, lineHeight: 16, minHeight: 32, opacity: 0.9 },
  priceBlock: { marginTop: 6 },
  price: { fontSize: 16, fontWeight: "700" },
  stock: { fontSize: 10, marginTop: 2 },
  rating: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  ratingText: { fontSize: 11, marginLeft: 4 },
  footer: { padding: 10, marginTop: "auto" },
  addBtn: {
    height: 40,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addText: { fontSize: 14, fontWeight: "700" },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtyBtn: {
    width: 40,
    height: 36,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    minWidth: 24,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
  },
});
