import React, { useMemo } from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { ThemedButton } from '../../components/ThemedButton';
import { useThemeColor } from '../../hooks/useThemeColor';
import { ProductCard } from '../../components/ProductCard';
import { MOCK_PRODUCTS, Product } from '../../data/products';
import { useCart } from '../../state/cart';
import { BRL } from '../../utils/format';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Icon } from '../../components/Icon';

type CartItem = Product & { quantity: number };

const ItemSeparator = () => <View style={styles.separator} />;

export function OrdersScreen() {
  const navigation =
    useNavigation<NavigationProp<ReactNavigation.RootParamList>>();
  const { qty, add, inc, dec, clear } = useCart();

  const bg = useThemeColor('background');
  const card = useThemeColor('surface');
  const outline = useThemeColor('outline');
  const text = useThemeColor('text');

  const items: CartItem[] = useMemo(() => {
    return Object.entries(qty)
      .map(([id, q]) => {
        const p = MOCK_PRODUCTS.find(pp => pp.id === id);
        if (!p || q <= 0) return null;
        return { ...p, quantity: q };
      })
      .filter(Boolean) as CartItem[];
  }, [qty]);

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + it.price * it.quantity, 0),
    [items],
  );

  const shipping = 10;
  const taxes = 0;
  const discount = 0;
  const extras = shipping + taxes - discount;
  const hasExtras = extras !== 0;
  const finalTotal = subtotal + extras;
  const totalLabel = hasExtras ? 'Total' : 'Subtotal';
  const totalValue = hasExtras ? finalTotal : subtotal;

  const renderItem: ListRenderItem<CartItem> = ({ item }) => (
    <ProductCard
      product={item}
      quantity={item.quantity}
      onAdd={() => add(item.id, item.stock)}
      onIncrease={() => inc(item.id, item.stock)}
      onDecrease={() => dec(item.id)}
      onPress={() =>
        (navigation as any).navigate('ProductDetails', { id: item.id })
      }
      style={{ flex: 1 }}
    />
  );

  if (items.length === 0) {
    return (
      <ThemedView style={[styles.emptyWrap, { backgroundColor: bg }]}>
        <Icon
          name="cart-off"
          family="material-community"
          size={48}
          color={outline}
        />
        <ThemedText type="title" style={{ marginTop: 8, textAlign: 'center' }}>
          Seu carrinho está vazio
        </ThemedText>
        <ThemedText style={{ marginTop: 8, textAlign: 'center' }}>
          Adicione itens na tela “Início”.
        </ThemedText>
        <ThemedButton
          title="Explorar produtos"
          onPress={() => {
            const root = (navigation as any).getParent?.() ?? navigation;
            root.navigate('HomeTabs' as never, { screen: 'Home' } as never);
          }}
          buttonStyle={{ marginTop: 16, alignSelf: 'center' }}
        />
      </ThemedView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={items}
        keyExtractor={it => it.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columns}
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
      />
      <View style={{ marginTop: 100 }} />
      <View
        style={[
          styles.checkoutBar,
          { backgroundColor: card, borderColor: outline },
        ]}
        accessibilityLabel={`${totalLabel} do carrinho ${BRL.format(
          totalValue,
        )}`}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.totalsRow}>
            <Text style={[styles.totalLabel, { color: text }]}>
              {totalLabel}
            </Text>
            <Text style={[styles.totalValue, { color: text }]}>
              {BRL.format(totalValue)}
            </Text>

            <Pressable onPress={clear} hitSlop={8} style={{ marginLeft: 12 }}>
              <Text style={[styles.clearText, { color: outline }]}>Limpar</Text>
            </Pressable>
          </View>

          {hasExtras && (
            <View style={[styles.breakdown, { borderColor: outline }]}>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: outline }]}>
                  Subtotal
                </Text>
                <Text style={[styles.breakdownValue, { color: text }]}>
                  {BRL.format(subtotal)}
                </Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: outline }]}>
                  Frete
                </Text>
                <Text style={[styles.breakdownValue, { color: text }]}>
                  {BRL.format(shipping)}
                </Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: outline }]}>
                  Impostos
                </Text>
                <Text style={[styles.breakdownValue, { color: text }]}>
                  {BRL.format(taxes)}
                </Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: outline }]}>
                  Desconto
                </Text>
                <Text style={[styles.breakdownValue, { color: text }]}>
                  -{BRL.format(discount)}
                </Text>
              </View>
            </View>
          )}

          <ThemedButton
            title={`Finalizar pedido (${items.length})`}
            onPress={() => {
              console.log('checkout');
            }}
            buttonStyle={{ marginTop: 12, width: '100%' }}
          />
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  totalsRow: { flexDirection: 'row', alignItems: 'center' },
  totalLabel: { fontSize: 14, fontWeight: '600', marginRight: 8 },
  totalValue: { fontSize: 16, fontWeight: '800' },
  clearText: { fontSize: 12 },
  breakdown: {
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  breakdownLabel: { fontSize: 12 },
  breakdownValue: { fontSize: 12, fontWeight: '700' },
  separator: { height: 12 },
});
