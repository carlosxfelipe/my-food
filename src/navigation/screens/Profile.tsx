import React, { useMemo } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedButton } from "../../components/ThemedButton";
import { useThemeColor } from "../../hooks/useThemeColor";
import { Icon } from "../../components/Icon";
import { useCart } from "../../state/cart";
import { useFavorites } from "../../state/favorites";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export function Profile() {
  const navigation = useNavigation<
    NavigationProp<ReactNavigation.RootParamList>
  >();

  const bg = useThemeColor("background");
  const surface = useThemeColor("surface");
  const onSurface = useThemeColor("onSurface");
  const outline = useThemeColor("outline");
  const primary = useThemeColor("primary");
  const onPrimary = useThemeColor("onPrimary");

  const user = {
    name: "Carlos Felipe Araújo",
    email: "carlosxfelipe@gmail.com",
    avatar:
      "https://avatars.githubusercontent.com/u/85801709?s=400&u=01cce0318ea853ce1a133699bc6b2af1919094d6&v=4",
  };

  const { qty } = useCart();
  const cartItems = useMemo(
    () => Object.values(qty).reduce((a, b) => a + b, 0),
    [qty],
  );

  const { count: favoritesCount } = useFavorites();

  return (
    <ThemedView style={[styles.container, { backgroundColor: bg }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.card, {
            backgroundColor: surface,
            borderColor: outline,
          }]}
        >
          <View style={styles.headerRow}>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText style={[styles.name, { color: onSurface }]}>
                {user.name}
              </ThemedText>
              <ThemedText style={[styles.email, { color: outline }]}>
                {user.email}
              </ThemedText>
            </View>
            <ThemedButton
              title="Editar"
              onPress={() =>
                Alert.alert("Editar perfil", "Aqui você abre um modal/form.")}
              buttonStyle={{ paddingHorizontal: 14, backgroundColor: primary }}
              textStyle={{ color: onPrimary }}
            />
          </View>
        </View>

        <View
          style={[styles.card, {
            backgroundColor: surface,
            borderColor: outline,
          }]}
        >
          <View style={styles.statsRow}>
            <Stat label="Pedidos" value="12" />
            <Divider />
            <Stat label="Favoritos" value={String(favoritesCount)} />
            <Divider />
            <Stat label="Avaliações" value="3" />
          </View>
        </View>

        <View
          style={[styles.card, {
            backgroundColor: surface,
            borderColor: outline,
          }]}
        >
          <SectionTitle title="Conta" />
          <ActionRow
            icon="map-marker-outline"
            label="Endereços"
            onPress={() => Alert.alert("Endereços")}
          />
          <ActionRow
            icon="credit-card-outline"
            label="Pagamentos"
            onPress={() => Alert.alert("Pagamentos")}
          />
          <ActionRow
            icon="bell-outline"
            label="Notificações"
            onPress={() => Alert.alert("Notificações")}
          />
          <SectionTitle title="Ajuda" />
          <ActionRow
            icon="help-circle-outline"
            label="Central de ajuda"
            onPress={() => Alert.alert("Ajuda")}
          />
          <ActionRow
            icon="lock-outline"
            label="Privacidade"
            onPress={() => Alert.alert("Privacidade")}
          />

          <ThemedButton
            title="Sair da conta"
            iconLeft={
              <Icon
                name="logout"
                family="material-community"
                size={18}
                color={onPrimary}
              />
            }
            onPress={() => Alert.alert("Logout", "Você saiu da conta.")}
            buttonStyle={{ marginTop: 12, backgroundColor: primary }}
            textStyle={{ color: onPrimary }}
          />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <CartBar
        onPress={() => {
          const root = (navigation as any).getParent?.() ?? navigation;
          root.navigate("HomeTabs" as never, { screen: "Orders" } as never);
        }}
        items={cartItems}
        outline={outline}
        surface={surface}
        onSurface={onSurface}
      />
    </ThemedView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  const onSurface = useThemeColor("onSurface");
  const outline = useThemeColor("outline");
  return (
    <View style={styles.stat}>
      <ThemedText style={[styles.statValue, { color: onSurface }]}>
        {value}
      </ThemedText>
      <ThemedText style={[styles.statLabel, { color: outline }]}>
        {label}
      </ThemedText>
    </View>
  );
}

function Divider() {
  const outline = useThemeColor("outline");
  return <View style={[styles.divider, { backgroundColor: outline }]} />;
}

function SectionTitle({ title }: { title: string }) {
  const outline = useThemeColor("outline");
  return (
    <ThemedText style={[styles.sectionTitle, { color: outline }]}>
      {title}
    </ThemedText>
  );
}

function ActionRow({
  icon,
  label,
  right,
  onPress,
}: {
  icon: string;
  label: string;
  right?: React.ReactNode;
  onPress?: () => void;
}) {
  const onSurface = useThemeColor("onSurface");
  const outline = useThemeColor("outline");

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        { borderColor: outline, opacity: pressed ? 0.96 : 1 },
      ]}
      android_ripple={{ color: "#00000010" }}
    >
      <View style={styles.rowLeft}>
        <Icon
          name={icon}
          family="material-community"
          size={20}
          color={onSurface}
        />
        <ThemedText style={[styles.rowLabel, { color: onSurface }]}>
          {label}
        </ThemedText>
      </View>
      {right ?? (
        <Icon
          name="chevron-right"
          family="material-community"
          size={22}
          color={outline}
        />
      )}
    </Pressable>
  );
}

function CartBar({
  items,
  onPress,
  outline,
  surface,
  onSurface,
}: {
  items: number;
  onPress: () => void;
  outline: string;
  surface: string;
  onSurface: string;
}) {
  const label = items === 0
    ? "Carrinho vazio"
    : `${items} item(ns) no carrinho`;
  return (
    <View
      style={[
        styles.cartBar,
        { backgroundColor: surface, borderColor: outline },
      ]}
      accessibilityLabel={label}
    >
      <View style={styles.cartLeft}>
        <Icon
          name="cart-outline"
          size={20}
          color={onSurface}
          family="material-community"
        />
        <ThemedText style={[styles.cartText, { color: onSurface }]}>
          {label}
        </ThemedText>
      </View>
      <ThemedButton title="Ir para pedidos" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, gap: 12 },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    padding: 12,
  },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarWrap: { width: 64, height: 64, borderRadius: 32, overflow: "hidden" },
  avatar: { width: "100%", height: "100%" },
  name: { fontSize: 18, fontWeight: "800" },
  email: { fontSize: 12, marginTop: 2 },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  stat: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  statValue: { fontSize: 18, fontWeight: "800" },
  statLabel: { fontSize: 12, marginTop: 2 },
  divider: { width: 1, height: 28, opacity: 0.4 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginTop: 4,
    marginBottom: 6,
  },
  row: {
    minHeight: 48,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  rowLabel: { fontSize: 14, fontWeight: "600" },
  cartBar: {
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
  cartLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  cartText: { fontSize: 13, fontWeight: "600" },
});
