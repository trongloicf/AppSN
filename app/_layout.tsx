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
      <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
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
            name='user/User'
            options={{ title: "Tài khoản" }}
          />
          <Drawer.Screen
            name='user/[id]'
            options={{ title: "Sửa hồ sơ", drawerItemStyle: { display: 'none' } }}
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
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Tabs } from "expo-router";
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import 'react-native-reanimated';

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
//         <Tabs screenOptions={{ headerShown: false }}>
//           <Tabs.Screen
//             name="index"
//             options={{ title: "Trang chủ" }}
//           />
//           <Tabs.Screen
//             name="cart"
//             options={{ title: "Giỏ hàng" }}
//           />
//           <Tabs.Screen
//             name="user/User"
//             options={{ title: "Tôi" }}
//           />
//           <Tabs.Screen
//             name="user/InfoUser"
//             options={{ title: "Sửa hồ sơ", tabBarButton: () => null }}
//           />
//           <Tabs.Screen
//             name="(auths)/login"
//             options={{ tabBarButton: () => null }}
//           />
//           <Tabs.Screen
//             name="(auths)/register"
//             options={{ tabBarButton: () => null }}
//           />
//           <Tabs.Screen
//             name="+not-found"
//             options={{ tabBarButton: () => null }}
//           />
//           <Tabs.Screen
//             name="product/[id]"
//             options={{ tabBarButton: () => null }}
//           />
//         </Tabs>
//       </ThemeProvider>
//     </GestureHandlerRootView>
//   );
// }
