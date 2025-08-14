import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  StyleProp,
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
  style?: StyleProp<ViewStyle>;
  trackLight?: string;
  trackDark?: string;
  fillLight?: string;
  fillDark?: string;
  mode?: "determinate" | "indeterminate" | "buffer";
  bufferValue?: number;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(n, b));
}

function withOpacity(color: string, opacity: number = 0.35) {
  if (!color?.startsWith("#")) return color;
  let hex = color.slice(1);
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  if (hex.length !== 6) return color;
  const alpha = Math.round(opacity * 255).toString(16).padStart(2, "0");
  return `#${hex}${alpha}`;
}

export function ProgressBar({
  value,
  min = 0,
  max = 100,
  height = 10,
  radius,
  showLabels = false,
  showMarker = false,
  style,
  trackLight,
  trackDark,
  fillLight,
  fillDark,
  mode = "determinate",
  bufferValue = 0,
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

  const b = useMemo(() => {
    const range = max - min || 1;
    return clamp((bufferValue - min) / range, 0, 1);
  }, [bufferValue, min, max]);

  const animated = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (mode === "indeterminate") {
      animated.setValue(0);
      const loop = Animated.loop(
        Animated.timing(animated, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
      );
      loop.start();
      return () => loop.stop();
    } else {
      Animated.timing(animated, {
        toValue: p,
        duration: 220,
        useNativeDriver: false,
      }).start();
    }
  }, [p, mode, animated]);

  const barRadius = radius ?? Math.round(height / 2);
  const markerHalf = 7; // metade da base do triângulo

  const fillWidth = mode === "indeterminate"
    ? Animated.multiply(
      animated.interpolate({ inputRange: [0, 1], outputRange: [0.15, 0.85] }),
      width,
    )
    : Animated.multiply(animated, width);

  const fillLeft = mode === "indeterminate"
    ? Animated.multiply(
      animated.interpolate({ inputRange: [0, 1], outputRange: [-0.15, 1] }),
      width,
    )
    : 0 as any;

  const bufferWidth = Animated.multiply(new Animated.Value(b), width);

  const markerLeft = Animated.add(
    Animated.multiply(animated, width),
    new Animated.Value(-markerHalf),
  );

  return (
    <View style={style}>
      <View
        style={[
          styles.track,
          {
            height,
            borderRadius: barRadius,
            backgroundColor: trackColor,
            overflow: mode === "indeterminate" ? "hidden" : "visible",
          },
        ]}
        onLayout={onLayout}
        accessibilityRole="progressbar"
        accessibilityValue={mode === "indeterminate"
          ? { min, max }
          : { min, max, now: value }}
      >
        {mode === "buffer" && (
          <Animated.View
            style={[
              styles.fill,
              {
                width: bufferWidth,
                height,
                borderRadius: barRadius,
                backgroundColor: withOpacity(fillColor, 0.35),
              },
            ]}
          />
        )}
        <Animated.View
          style={[
            styles.fill,
            {
              width: fillWidth,
              left: fillLeft,
              height,
              borderRadius: barRadius,
              backgroundColor: fillColor,
            },
          ]}
        />
        {showMarker && mode !== "indeterminate" && width > 0 && (
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

      {showLabels && mode !== "indeterminate" && (
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
    // overflow: "visible",
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
