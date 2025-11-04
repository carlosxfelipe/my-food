import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import type { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Icon } from '../components/Icon';
import { useCart } from '../state/cart';
import { useThemeColor } from '../hooks/useThemeColor';
import { ThemedText } from '../components/ThemedText';

type HeaderProps = NativeStackHeaderProps | BottomTabHeaderProps;

export function AppHeader(props: HeaderProps) {
  const { navigation, options } = props as any;
  const back =
    'back' in props ? (props as NativeStackHeaderProps).back : undefined;
  const { colors } = useTheme();
  const placeholder = useThemeColor('placeholder');
  const textColor = useThemeColor('text');
  const iconColor = useThemeColor('text');
  const searchBgColor = useThemeColor('inputBackground');

  // const cartCount = Number((options as any)?.cartCount) || 0;
  const { count: cartCount } = useCart();
  const bellCount = Number((options as any)?.bellCount) || 0;

  const [query, setQuery] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceDelay = 400;

  function handleChangeText(text: string) {
    setQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (typeof (options as any)?.onChangeQuery === 'function') {
        (options as any).onChangeQuery(text);
      }
    }, debounceDelay);
  }

  function handleClear() {
    setQuery('');
    if (typeof (options as any)?.onChangeQuery === 'function') {
      (options as any).onChangeQuery('');
    }
  }

  const showSearch =
    typeof (options as any)?.onChangeQuery === 'function' ||
    typeof (options as any)?.onSearch === 'function';

  const [actionsWidth, setActionsWidth] = useState(0);

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.container,
        { backgroundColor: colors.card, borderBottomColor: colors.border },
      ]}
    >
      <View
        style={[styles.left, !back && { width: showSearch ? 0 : actionsWidth }]}
      >
        {back && (
          <Pressable onPress={navigation.goBack} hitSlop={8}>
            <Icon
              name="chevron-left"
              size={28}
              color={iconColor}
              family="material-community"
            />
          </Pressable>
        )}

        {!back && !showSearch && (
          // placeholder só quando NÃO tem seta E NÃO tem busca
          <View style={{ width: 22, height: 22 }} />
        )}
      </View>

      {showSearch ? (
        <View
          style={[
            styles.search,
            {
              backgroundColor: searchBgColor,
              borderColor: colors.border,
            },
          ]}
        >
          <Icon
            name="magnify"
            size={20}
            color={iconColor}
            family="material-community"
          />
          <TextInput
            value={query}
            placeholder="Buscar"
            placeholderTextColor={placeholder}
            style={[styles.input, { color: textColor }]}
            returnKeyType="search"
            onChangeText={handleChangeText}
            onSubmitEditing={e => {
              const q = e.nativeEvent.text?.trim();
              if (!q) return;
              if (typeof (options as any)?.onSearch === 'function') {
                (options as any).onSearch(q);
              }
            }}
          />
          {query.length > 0 && (
            <Pressable onPress={handleClear} hitSlop={8}>
              <Icon
                name="close"
                size={20}
                color={iconColor}
                family="material-community"
              />
            </Pressable>
          )}
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <ThemedText numberOfLines={1} ellipsizeMode="tail" type="subtitle">
            {options?.title}
          </ThemedText>
        </View>
      )}

      <View
        style={styles.actions}
        onLayout={e => setActionsWidth(e.nativeEvent.layout.width)}
      >
        <Pressable
          onPress={() => {
            const root = navigation.getParent?.() ?? navigation;
            root.navigate('CameraScreen' as never);
          }}
          hitSlop={8}
          style={styles.iconWrap}
        >
          <Icon
            name="barcode-scan"
            size={22}
            color={iconColor}
            family="material-community"
          />
        </Pressable>
        <BadgeIcon
          icon="cart-outline"
          count={cartCount}
          tint={iconColor}
          onPress={() => {
            const root = navigation.getParent?.() ?? navigation;
            root.navigate('HomeTabs' as never, { screen: 'Orders' } as never);
          }}
        />
        <BadgeIcon
          icon="bell-outline"
          count={bellCount}
          tint={iconColor}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

function BadgeIcon({
  icon,
  count,
  tint,
  onPress,
}: {
  icon: string;
  count: number;
  tint: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.iconWrap}>
      <Pressable onPress={onPress} hitSlop={8}>
        <Icon name={icon} size={22} color={tint} family="material-community" />
      </Pressable>
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 9 ? '+9' : count}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  left: { width: 40, alignItems: 'flex-start' },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginLeft: 4,
    paddingRight: 4,
  },
  iconWrap: { position: 'relative' },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
});
