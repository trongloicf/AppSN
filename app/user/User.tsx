import HeaderUser from "@/components/HeaderUser";
import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function User() {
  const { user: userParam } = useLocalSearchParams<{ user?: string }>();
  const [user, setUser] = useState<any>(userParam ? JSON.parse(userParam) : null);
  const [loading, setLoading] = useState(!user);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadUser = async () => {
        if (user) {
          setLoading(false);
          return;
        }

        setLoading(true);
        const values = await AsyncStorage.multiGet(["token", "user"]);
        const token = values[0][1];
        const userStr = values[1][1];

        if (!isActive) return;

        if (!token || !userStr) {
          router.replace("/login");
          return;
        }

        setUser(JSON.parse(userStr));
        setLoading(false);
      };

      loadUser();
      return () => {
        isActive = false;
      };
    }, [user])
  );


  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="tomato" />;

  if (!user) return <Redirect href="/login" />;

  return (
    <SafeAreaView style={{ backgroundColor: "#333", flex: 1 }}>
      {user && <HeaderUser user={user} />}
      <ScrollView style={{ backgroundColor: "#fafafa" }}>
        <View style={[styles.pdH10, styles.bgWhite, styles.pdV10]}>
          <TouchableOpacity style={[styles.row, styles.justifySpaceBetween, styles.alignCenter]}>
            <Text style={[styles.fS16]}>Đơn mua</Text>
            <View style={[styles.row, styles.gap5, styles.alignCenter]}>
              <Text style={[styles.fS16]}>Xem lịch sử mua hàng</Text>
              <FontAwesome6 style={{ color: "#ccc" }} name="chevron-right" />
            </View>
          </TouchableOpacity>

          <View style={[styles.row, styles.gap5, styles.alignCenter, styles.justifySpaceBetween, styles.pdV10]}>
            <TouchableOpacity>
              <View style={[styles.alignCenter, styles.pdV10]}>
                <FontAwesome6 name="hourglass-half" size={18} />
              </View>
              <Text>Chờ xác nhận</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={[styles.alignCenter, styles.pdV10]}>
                <FontAwesome6 name="truck-fast" size={18} />
              </View>
              <Text>Đang giao hàng</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={[styles.alignCenter, styles.pdV10]}>
                <FontAwesome6 name="box-open" size={18} />
              </View>
              <Text>Đã giao</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={async () => {
            setUser(null);
            await AsyncStorage.clear();
            router.replace("/(auths)/login");
          }}
          style={{
            margin: 20,
            padding: 12,
            backgroundColor: "tomato",
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pdV10: { paddingVertical: 10 },
  pdH10: { paddingHorizontal: 10 },
  bgWhite: { backgroundColor: "#fafafa" },
  justifySpaceBetween: { justifyContent: "space-between" },
  row: { flexDirection: "row" },
  alignCenter: { alignItems: "center" },
  fS16: { fontSize: 15 },
  gap5: { gap: 5 },
});
