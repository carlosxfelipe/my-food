import { useTheme } from "../theme/ThemeContext";

type SkeletonColorSet = {
  base: { light: string; dark: string };
  highlight: { light: string; dark: string };
};

const skeletonColors: SkeletonColorSet = {
  base: {
    light: "#e0e0e0",
    dark: "#333333",
  },
  highlight: {
    light: "#f5f5f5",
    dark: "#555555",
  },
};

export function useSkeletonColors() {
  const { theme } = useTheme();

  return {
    baseColor: skeletonColors.base[theme],
    highlightColor: skeletonColors.highlight[theme],
  };
}
