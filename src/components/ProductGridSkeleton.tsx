import React from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

type Props = {
  count?: number;
  gap?: number;
};

export function ProductGridSkeleton({ count = 8, gap = 12 }: Props) {
  const data = React.useMemo(() => Array.from({ length: count }, (_, i) => i), [
    count,
  ]);

  const renderItem = React.useCallback(
    (_: ListRenderItemInfo<number>) => (
      <ProductCardSkeleton style={{ flex: 1 }} />
    ),
    [],
  );

  const ItemSeparator = React.useCallback(
    () => <View style={{ height: gap }} />,
    [gap],
  );

  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 12, paddingBottom: 96, gap }}
      data={data}
      keyExtractor={(i) => String(i)}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={{ gap }}
      ItemSeparatorComponent={ItemSeparator}
      showsVerticalScrollIndicator={false}
    />
  );
}
