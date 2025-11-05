import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderButton, Text } from '@react-navigation/elements';
import { HomeScreen } from './screens/HomeScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { NotFoundScreen } from './screens/NotFoundScreen';
import { BottomTabAdapter } from './BottomTabAdapter';
import { AppHeader } from './AppHeader';
import { ProductDetails } from './screens/ProductDetails';
import { CameraScreen } from './screens/CameraScreen';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Início',
        tabBarIconNameActive: 'home',
        tabBarIconNameInactive: 'home-outline',
      } as any,
    },
    Orders: {
      screen: OrdersScreen,
      options: {
        title: 'Pedidos',
        tabBarIconNameActive: 'package-variant',
        tabBarIconNameInactive: 'package-variant-closed',
      } as any,
    },
    // Settings: {
    //   screen: Settings,
    //   options: {
    //     title: "Configurações",
    //     tabBarIconNameActive: "cog",
    //     tabBarIconNameInactive: "cog-outline",
    //   } as any,
    // },
    Favorites: {
      screen: FavoritesScreen,
      options: {
        title: 'Favoritos',
        tabBarIconNameActive: 'heart',
        tabBarIconNameInactive: 'heart-outline',
      } as any,
    },
    Profile: {
      screen: ProfileScreen,
      options: {
        title: 'Perfil',
        tabBarIconNameActive: 'account',
        tabBarIconNameInactive: 'account-outline',
      } as any,
    },
  },
  tabBar: props => <BottomTabAdapter {...props} />,
  // Define o AppHeader como header padrão para todas as telas do TabNavigator
  screenOptions: {
    header: props => <AppHeader {...props} />,
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    ProductDetails: {
      screen: ProductDetails,
      options: {
        // usa o mesmo header customizado (com seta de voltar)
        header: props => <AppHeader {...props} />,
      },
      linking: {
        path: 'product/:id',
        parse: { id: value => String(value) },
      },
    },
    Profile: {
      screen: ProfileScreen,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: { user: value => value.replace(/^@/, '') },
        stringify: { user: value => `@${value}` },
      },
    },
    Settings: {
      screen: SettingsScreen,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerLeft: () => null, // Remove a seta de voltar no modal para exibir apenas o botão "Close"
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    CameraScreen: {
      screen: CameraScreen,
      options: {
        title: 'Scanner',
        header: props => <AppHeader {...props} />,
      },
    },
    NotFound: {
      screen: NotFoundScreen,
      options: { title: '404' },
      linking: { path: '*' },
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
