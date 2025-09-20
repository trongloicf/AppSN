import Banner from "@/components/Banner";
import Header from "@/components/Header";
import { API } from "@/constants/Api";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const M = 10; // khoảng cách bạn muốn
const ITEM_WIDTH = (width - M * 3) / 2; 

export default function HomeScreen() {
  const [products, setProducts] = useState<any[]>([])
  useEffect(() => {
    fetch(`${API}/products`)
      .then((reponse) => reponse.json())
      .then((reponse) => setProducts(reponse))
      .catch((err) => console.log(err))
  }, [])
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <Header />
      <ScrollView>
        <View style={styles.container}>
          <Banner />
          <View style={[styles.card]}>
            {products.map((product, index) => (
              <TouchableOpacity key={product.id} style={[styles.col2, { marginLeft: index % 2 === 0 ? M : M / 2, marginRight: index % 2 === 0 ? M / 2 : M}]}
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
                <View style={[styles.p8, styles.bgBlack, styles.contentP]}>
                  <Text style={[styles.textColor, styles.nameP]} numberOfLines={2} ellipsizeMode="tail">{product.sanpham_ten}</Text>
                  <Text style={styles.price}>
                    {Number(product.sanpham_gia).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9"
  },
  card: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  col2: {
    width: ITEM_WIDTH,
    height: 250,
    marginTop: M/2,
    marginBottom: M/2,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imgCard: {
    width: "100%",
    height: 185,
    resizeMode: "cover",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  price: {
    color: "#fff",
    fontWeight: "bold"
  },
  bgBlack: {
    backgroundColor: "#2F3137"
  },
  bgWhite: {
    backgroundColor: "#fff"
  },
  textColor: {
    color: "#fff"
  },
  p8: {
    padding: 8
  },
  contentP: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    display: "flex",
    justifyContent: "space-between"
  },
  nameP: {
    fontWeight: 500
  }
});
