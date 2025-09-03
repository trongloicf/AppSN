import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CartScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header />
      <Text style={styles.text}>Trang giỏ hàng</Text>
      <View style={styles.item}>
        <Image
          source={{ uri: "https://sneakerdaily.vn/wp-content/uploads/2025/08/Ao-adidas-Manchester-United-25_26-Away-Authentic-Jersey-White-JI7424.jpg" }}
          style={styles.img}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Áo adidas Manchester United 2526 Away Authentic Jersey ‘White’ JI7424</Text>
          <Text style={styles.price}>1.200.000₫</Text>
        </View>
        <TouchableOpacity style={styles.btnRemove}>
          <Text style={{ color: "#fff" }}>Xóa</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.item}>
        <Image
          source={{ uri: "https://sneakerdaily.vn/wp-content/uploads/2025/08/Ao-adidas-Manchester-United-25_26-Away-Authentic-Jersey-White-JI7424.jpg" }}
          style={styles.img}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Áo adidas Manchester United 2526 Away Authentic Jersey ‘White’ JI7424</Text>
          <Text style={styles.price}>1.150.000₫</Text>
        </View>
        <TouchableOpacity style={styles.btnRemove}>
          <Text style={{ color: "#fff" }}>Xóa</Text>
        </TouchableOpacity>
      </View>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  item: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  img: { width: 60, height: 60, marginRight: 10, borderRadius: 5 },
  name: { fontSize: 16, fontWeight: "500" },
  price: { color: "tomato" },
  btnRemove: { backgroundColor: "red", padding: 6, borderRadius: 5 },
  text: { color: "red", fontSize: 15, marginBottom: 15, marginTop: 80 }
});
