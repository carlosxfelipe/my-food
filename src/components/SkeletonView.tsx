import React, { useEffect, useRef } from "react";
import {
  Animated,
  type DimensionValue,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { useSkeletonColors } from "../hooks/useSkeletonColors";

interface SkeletonViewProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export const SkeletonView = ({
  width = "100%",
  height = 100,
  borderRadius = 8,
  style,
}: SkeletonViewProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { baseColor, highlightColor } = useSkeletonColors();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: baseColor,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: highlightColor,
          opacity: fadeAnim,
          borderRadius,
        }}
      />
    </View>
  );
};
