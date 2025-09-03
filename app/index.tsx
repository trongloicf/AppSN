import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { API } from "./contants";

export default function HomeScreen() {
  const [products, setProducts] = useState<any[]>([])
  useEffect(() => {
    fetch(`${API}/sanpham`)
      .then((reponse) => reponse.json())
      .then((reponse) => setProducts(reponse))
      .catch((err) => console.log(err))
  }, [])
  return (
    <>
      <Header />
      <ScrollView>
      <View style={styles.container}>
        <Banner />
        <View style={styles.card}>
          {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.col2} 
              onPress={() => router.push({
                pathname: '/product/[id]',
                params: { id: product.id }
              })}
            > 
              <Image
                style={styles.imgCard}
                source={{
                  uri: product.sanpham_anh,
                }}
              />
              <Text>{product.sanpham_ten}</Text>
              <Text style={styles.price}>
                {Number(product.sanpham_gia).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
          </TouchableOpacity>
          ))}
        </View>
        <Footer />
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  card: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
    cursor: "pointer"
  },
  col2: {
    width: "50%",
    padding: 5,
    borderColor: "#F8F8F8",
    borderWidth: 1,
    borderStyle: "solid"
  },
  imgCard: {
    height: 150,
    resizeMode: "contain",
    width: "100%",
  },
  price: {
    color: "black",
    fontWeight: "bold"
  }
});
