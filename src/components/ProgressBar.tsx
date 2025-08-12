import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

type Props = {
  value: number;
  min?: number;
  max?: number;
  height?: number;
  radius?: number;
  showLabels?: boolean;
  showMarker?: boolean;
  style?: ViewStyle;
  trackLight?: string;
  trackDark?: string;
  fillLight?: string;
  fillDark?: string;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(n, b));
}

export function ProgressBar({
  value,
  min = 0,
  max = 100,
  height = 10,
  radius,
  showLabels = true,
  showMarker = true,
  style,
  trackLight,
  trackDark,
  fillLight,
  fillDark,
}: Props) {
  const trackColor = useThemeColor("surfaceVariant", {
    light: trackLight,
    dark: trackDark,
  });
  const fillColor = useThemeColor("primary", {
    light: fillLight,
    dark: fillDark,
  });
  const labelColor = useThemeColor("onSurface");

  const [width, setWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) =>
    setWidth(e.nativeEvent.layout.width);

  const p = useMemo(() => {
    const range = max - min || 1;
    return clamp((value - min) / range, 0, 1);
  }, [value, min, max]);

  const animated = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animated, {
      toValue: p,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [p, animated]);

  const barRadius = radius ?? Math.round(height / 2);
  const markerHalf = 7; // metade da base do triângulo

  const fillWidth = Animated.multiply(animated, width);

  const markerLeft = Animated.add(
    Animated.multiply(animated, width),
    new Animated.Value(-markerHalf),
  );

  return (
    <View style={style}>
      <View
        style={[
          styles.track,
          { height, borderRadius: barRadius, backgroundColor: trackColor },
        ]}
        onLayout={onLayout}
        accessibilityRole="progressbar"
        accessibilityValue={{ min, max, now: value }}
      >
        <Animated.View
          style={[
            styles.fill,
            {
              width: fillWidth,
              height,
              borderRadius: barRadius,
              backgroundColor: fillColor,
            },
          ]}
        />
        {showMarker && width > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[styles.marker, { left: markerLeft, top: -(height + 6) }]}
          >
            <View
              style={[
                styles.triangle,
                {
                  borderTopColor: fillColor,
                },
              ]}
            />
          </Animated.View>
        )}
      </View>

      {showLabels && (
        <View style={styles.labels}>
          <Text style={[styles.labelText, { color: labelColor }]}>{min}</Text>
          <Text style={[styles.labelText, { color: labelColor }]}>{max}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    overflow: "visible",
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  marker: {
    position: "absolute",
    top: -12,
    zIndex: 2,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  labels: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelText: {
    fontSize: 12,
    opacity: 0.8,
  },
});
