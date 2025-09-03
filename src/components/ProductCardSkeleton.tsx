import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { SkeletonView } from "./SkeletonView";

type Props = { style?: ViewStyle };

export function ProductCardSkeleton({ style }: Props) {
  const surface = useThemeColor("surface");
  const outline = useThemeColor("outline");
  const surfaceVariant = useThemeColor("surfaceVariant");

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: surface, borderColor: outline },
        style,
      ]}
    >
      {/* imagem */}
      <View style={styles.imageWrap}>
        <SkeletonView width="100%" height="100%" borderRadius={0} />
        {/* tags (2 bolachinhas) */}
        <View style={styles.tagsRow}>
          <SkeletonView width={60} height={22} borderRadius={999} />
          <SkeletonView
            width={44}
            height={22}
            borderRadius={999}
            style={{ marginLeft: 6 }}
          />
        </View>
      </View>

      {/* conteúdo */}
      <View style={styles.content}>
        {/* título 2 linhas */}
        <SkeletonView width="90%" height={16} />
        <SkeletonView width="70%" height={16} style={{ marginTop: 6 }} />

        {/* sku */}
        <SkeletonView width="40%" height={12} style={{ marginTop: 8 }} />

        {/* descrição 2 linhas */}
        <SkeletonView width="100%" height={12} style={{ marginTop: 10 }} />
        <SkeletonView width="80%" height={12} style={{ marginTop: 6 }} />

        {/* preço & estoque */}
        <SkeletonView width="40%" height={18} style={{ marginTop: 10 }} />
        <SkeletonView width="30%" height={10} style={{ marginTop: 6 }} />

        {/* rating */}
        <View
          style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonView
              key={i}
              width={16}
              height={16}
              borderRadius={4}
              style={{ marginRight: 4 }}
            />
          ))}
          <SkeletonView width={28} height={12} style={{ marginLeft: 6 }} />
        </View>
      </View>

      {/* footer */}
      <View style={[styles.footer, { backgroundColor: surfaceVariant }]}>
        {/* botão grande */}
        <SkeletonView width="100%" height={40} borderRadius={10} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    overflow: "hidden",
    flex: 1,
  },
  imageWrap: { position: "relative", aspectRatio: 4 / 3 },
  tagsRow: { position: "absolute", top: 8, left: 8, flexDirection: "row" },
  content: { padding: 10, gap: 0, flexGrow: 1 },
  footer: { padding: 10, marginTop: "auto" },
});
