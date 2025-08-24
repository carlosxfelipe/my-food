import { composeProviders, Provider, withProps } from "./composeProviders";
import { ThemeProvider } from "../theme/ThemeContext";
import { CartProvider } from "../state/cart";
import { FavoritesProvider } from "../state/favorites";

// Provider que exige props:
const Theme: Provider = withProps(ThemeProvider, { disableDarkMode: false });

export const AppProviders = composeProviders(
  Theme, // mais externo
  CartProvider,
  FavoritesProvider,
);
