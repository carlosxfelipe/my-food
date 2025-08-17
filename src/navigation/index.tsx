import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButton, Text } from "@react-navigation/elements";
import { Home } from "./screens/Home";
import { Orders } from "./screens/Orders";
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";
import { NotFound } from "./screens/NotFound";
import { BottomTabAdapter } from "./BottomTabAdapter";
import { AppHeader } from "./AppHeader";
import { ProductDetails } from "./screens/ProductDetails";

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: "Início",
        tabBarIconNameActive: "home",
        tabBarIconNameInactive: "home-outline",
        tabBarIconFamilyActive: "material-community",
        tabBarIconFamilyInactive: "material-community",
      } as any,
    },
    Orders: {
      screen: Orders,
      options: {
        title: "Pedidos",
        tabBarIconNameActive: "package-variant",
        tabBarIconNameInactive: "package-variant-closed",
        tabBarIconFamilyActive: "material-community",
        tabBarIconFamilyInactive: "material-community",
      } as any,
    },
    Settings: {
      screen: Settings,
      options: {
        title: "Configurações",
        tabBarIconNameActive: "cog",
        tabBarIconNameInactive: "cog-outline",
        tabBarIconFamilyActive: "material-community",
        tabBarIconFamilyInactive: "material-community",
      } as any,
    },
    Profile: {
      screen: Profile,
      options: {
        title: "Perfil",
        tabBarIconNameActive: "account",
        tabBarIconNameInactive: "account-outline",
        tabBarIconFamilyActive: "material-community",
        tabBarIconFamilyInactive: "material-community",
      } as any,
    },
  },
  tabBar: (props) => <BottomTabAdapter {...props} />,
  // Define o AppHeader como header padrão para todas as telas do TabNavigator
  screenOptions: {
    header: (props) => <AppHeader {...props} />,
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false,
      },
    },
    ProductDetails: {
      screen: ProductDetails,
      options: {
        // usa o mesmo header customizado (com seta de voltar)
        header: (props) => <AppHeader {...props} />,
      },
      linking: {
        path: "product/:id",
        parse: { id: (value) => String(value) },
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ":user(@[a-zA-Z0-9-_]+)",
        parse: { user: (value) => value.replace(/^@/, "") },
        stringify: { user: (value) => `@${value}` },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: "modal",
        headerLeft: () => null, // Remove a seta de voltar no modal para exibir apenas o botão "Close"
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: { title: "404" },
      linking: { path: "*" },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
