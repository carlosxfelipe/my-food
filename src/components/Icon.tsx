import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

type IconFamily =
  | "material"
  | "material-community"
  | "ionicons"
  | "fontawesome"
  | "feather";

const iconMap = {
  material: MaterialIcons,
  "material-community": MaterialCommunityIcons,
  ionicons: Ionicons,
  fontawesome: FontAwesome,
  feather: Feather,
} as const;

type Props = {
  name: string;
  family?: IconFamily;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function Icon({
  name,
  family = "material-community",
  size = 24,
  color = "black",
  style,
}: Props) {
  const IconComponent = iconMap[family];

  if (!IconComponent) {
    console.warn(`[Icon] Família de ícone "${family}" não encontrada.`);
    return null;
  }

  return <IconComponent name={name} size={size} color={color} style={style} />;
}
