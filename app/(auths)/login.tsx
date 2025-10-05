import { API } from "@/constants/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ Email và Mật khẩu");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        Alert.alert("Lỗi", data.message || "Đăng nhập thất bại");
        setLoading(false);
        return;
      }

      const token = data.token;

      // Lấy profile
      const profileRes = await fetch(`${API}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profile = await profileRes.json();

      if (!profileRes.ok) {
        Alert.alert("Lỗi", "Không lấy được thông tin profile");
        setLoading(false);
        return;
      }

      // Lấy user chi tiết
      const userRes = await fetch(`${API}/users/${profile.user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await userRes.json();

      if (!userRes.ok) {
        Alert.alert("Lỗi", "Không lấy được thông tin người dùng");
        setLoading(false);
        return;
      }

      // Lưu AsyncStorage xong mới điều hướng
      await AsyncStorage.multiSet([
        ["token", token],
        ["user", JSON.stringify(userData)],
      ]);

      router.replace({
        pathname: "/user/User",
        params: { user: JSON.stringify(userData) },
      });


    } catch (err) {
      console.error(err);
      Alert.alert("Lỗi", "Không kết nối được server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput placeholder="Email" placeholderTextColor="#333" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Mật khẩu" placeholderTextColor="#333" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={[styles.btn, loading && { opacity: 0.7 }]} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Đăng nhập</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 },
  btn: { backgroundColor: "tomato", padding: 12, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
