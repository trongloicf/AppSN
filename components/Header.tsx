import { FontAwesome5 } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Header() {
  const navigation: any = useNavigation()
    return (
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.topBar}>
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Image 
                    style={styles.menu}
                    source={{ uri: "https://sneakerdaily.vn/wp-content/uploads/2022/04/MENU-trang-chu.png" }}/>
              </TouchableOpacity>
              <Image 
                  style={styles.img}
                  source={{ uri: "https://sneakerdaily.vn/wp-content/uploads/2024/11/logo.jpg" }}/>
              <TouchableOpacity onPress={() => navigation.navigate('cart')}>
                <FontAwesome5 name="shopping-bag" size={24}/>
              </TouchableOpacity>
            </View>
            <View style={styles.wrapInputSearch}>
                <TextInput style={styles.inputSearch}
                    placeholder="Tìm kiếm sản phẩm, danh mục..."
                ></TextInput>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    )
}

export default Header; 

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fff",
    width: "100%",
    height: 80,
    padding: 5,
    zIndex: 999
  },
  wrapInputSearch: {
    display: "flex",
    flexDirection: "row"
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    width: 120,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  img: {
    flex: 1,
    height: 40,
    resizeMode: "contain",
  },
  menu: {
    width: 30,
    height: 26,
    resizeMode: "contain",
    cursor: "pointer"
  },
  inputSearch: {
    padding: 5,
    flex: 1,
    borderColor: "#ddd",
    borderStyle: "solid",
    borderWidth: 1,
    color: "#ccc",
    fontStyle: "italic"
  }
});