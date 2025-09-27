import Header from "@/components/Header";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#333" }}>
      <Header />
      <ScrollView style={{ flex: 1, backgroundColor: "#fafafa" }}>
        <View style={[styles.pdH10, styles.pdV10]}>
          <View style={[styles.row, styles.alignCenter, styles.bgWhite, styles.pdH10, styles.pdV10, styles.bR10]}>
            <TouchableOpacity style={[styles.box]}></TouchableOpacity>
            <Image resizeMode="contain" style={styles.img} source={{ uri: "https://res.cloudinary.com/dihfz2dcu/image/upload/v1757465999/fr69ktcs0hg8oldcduwq.jpg" }}/>           
            <View style={[styles.flex1]}>
              <View style={[styles.column]}>
                <View>
                  <Text>Áo Adidas Newcastle United 2025/26 ‘Black White’ JI7382</Text>
                  <></>
                </View>
              </View>
            </View> 
          </View>
        </View>
      </ScrollView>
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
    width: 20,
    height: 20,
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
  }
});
