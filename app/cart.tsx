import Header from "@/components/Header";
import { getCart, saveCart } from "@/storages/cartStorage";
import { FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const [cart, setCart] = useState<CartItem[]>([]);

  interface CartItem {
    id: number;
    name: string;
    image: string;
    priceOrigin: number;
    price: number;
    quantity: number;
    color_id: number;
    color_ten: string;
    size_id: number;
    size_ten: string;
  }

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     const items = await getCart();
  //     setCart(items);
  //   };
  //   fetchCart();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchCart = async () => {
        const items = await getCart();
        setCart(items);
      };
      fetchCart();
    }, [])
  );

  const handleDecrease = (id : number, color_id : number, size_id : number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.color_id === color_id && item.size_id === size_id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const handleIncrease = (id : number, color_id : number, size_id : number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.color_id === color_id && item.size_id === size_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleRemove = (id: number, color_id: number, size_id: number) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === id && item.color_id === color_id && item.size_id === size_id)
      )
    );
  };

  useEffect(() => {
    saveCart(cart);
  }, [cart]);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#333" }}>
      <Header />
      <ScrollView style={{ flex: 1, backgroundColor: "#fafafa", paddingBottom: 80 }}>
        <View style={[styles.pdH10, styles.pdV10]}>
          {cart.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>Giỏ hàng trống</Text>
          ) : (
            cart.map((item) => (
              <View
                key={`${item.id}-${item.color_id}-${item.size_id}`}
                style={[styles.row, styles.alignCenter, styles.bgWhite, styles.pdH10, styles.pdV10, styles.bR10, { marginBottom: 10 }]}
              >
                <TouchableOpacity style={[styles.box]}></TouchableOpacity>
                <Image resizeMode="contain" style={styles.img} source={{ uri: item.image }} />
                <View style={[styles.flex1]}>
                  <Text numberOfLines={2} style={{ fontWeight: "500" }}>{item.name}</Text>
                  <Text style={{ fontSize: 12, color: "#777" }}>
                    Màu: {item.color_ten} | Size: {item.size_ten}
                  </Text>

                  <View style={[styles.row, styles.wrapInput, styles.alignCenter]}>
                    <TouchableOpacity style={[styles.btn]} onPress={() => handleDecrease(item.id, item.color_id, item.size_id)}>
                      <Text>-</Text>
                    </TouchableOpacity>
                    <View style={[styles.alignCenter]}>
                      <Text>{item.quantity}</Text>
                    </View>
                    <TouchableOpacity style={[styles.btn]} onPress={() => handleIncrease(item.id, item.color_id, item.size_id)}>
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>

                  {item.price < item.priceOrigin ?
                    (
                      <View style={[styles.row, styles.alignCenter, styles.gap5]}>
                        <Text style={[styles.price]}>
                          {Number(item.price).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND"
                          })}
                        </Text>
                        <Text style={[styles.priceOld]}>
                          {Number(item.priceOrigin).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND"
                          })}
                        </Text>
                      </View>
                    ) : (
                      <View style={[styles.row, styles.alignCenter, styles.gap5]}>
                        <Text style={[styles.price]}>
                          {Number(item.priceOrigin).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND"
                          })}
                        </Text>
                      </View>
                    )
                  }
                </View>

                <TouchableOpacity onPress={() => handleRemove(item.id, item.color_id, item.size_id)}>
                  <FontAwesome6 name="trash" size={18} color={"#F14D2D"} />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
        <TouchableOpacity><Text>Mua hàng</Text></TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  column: {
    flexDirection: "column"
  },
  bR10: {
    borderRadius: 10
  },
  box: {
    width: 15,
    height: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5
  },
  alignCenter: {
    alignItems: "center"
  },
  pdH10: {
    paddingHorizontal: 10
  },
  pdV10: {
    paddingVertical: 10
  },
  bgWhite: {
    backgroundColor: "#fff"
  },
  img: {
    width: 80, height: 80, marginLeft: 8, borderRadius: 10, marginRight: 8
  },
  flex1: {
    flex: 1
  },
  price: {
    fontSize: 14,
    color: "#F14D2D",
    fontWeight: 500,
  },
  priceOld: {
    fontSize: 12,
    color: "#848383ff",
    textDecorationLine: "line-through",
    fontWeight: 500,
  },
  gap5: {
    gap: 5
  },
  wrapInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    width: 70,
    justifyContent: "space-between",
    marginVertical: 5
  },
  btn: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
