import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer screenOptions={{ headerShown: false }}>
        <Drawer.Screen
          name='index'
          options={{ title: "Trang chủ", headerShown: false }}
        />
        <Drawer.Screen
          name='cart'
          options={{ title: "Giỏ hàng" }}
        />
        <Drawer.Screen
          name="(auths)/login"
          options={{ drawerItemStyle: { display: 'none' } }}
        />
        <Drawer.Screen
          name="(auths)/register"
          options={{ drawerItemStyle: { display: 'none' } }}
        />
        <Drawer.Screen
          name="+not-found"
          options={{ drawerItemStyle: { display: 'none' } }}
        />
        <Drawer.Screen
          name="product/[id]"
          options={{ drawerItemStyle: { display: 'none' } }}
        />
      </Drawer>
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}
