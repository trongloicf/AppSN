import { API } from "@/constants/Api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ProductDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [product, setProduct] = useState<any>()
    const [quantity, setQuantity] = useState(1)
    const [cate, setCate] = useState<string>("")

    useEffect(() => {
        fetch(`${API}/products/${id}`)
            .then((response) => response.json())
            .then(data => {
                const productData = Array.isArray(data) ? data[0] : data
                setProduct(productData)
            })
            .catch((err) => console.log(err))
    }, [id])

    // useEffect(() => {
    //     if(product?.loaisanpham_id) {
    //         fetch(`${API}/loaisanpham/${product.loaisanpham_id}`)
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 const cateData = Array.isArray(data) ? data[0] : data
    //                 setCate(cateData.ten)
    //             })
    //             .catch((err) => console.log(err))
    //     }
    // },[product])

    const hadleIncrese = () => {
        setQuantity((prev) => prev + 1)
    }

    const handleDecrease = () => {
        setQuantity((prev) => prev > 0 ? prev - 1 : 0)
    }

    if (!product) return null;

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.bgWhite}>
                    <TouchableOpacity>
                        <Image source={{ uri: product.sanpham_anh }} style={styles.img} />
                    </TouchableOpacity>
                    <View style={styles.pd15}>
                        <Text style={styles.title}>{product.sanpham_ten}</Text>
                        <Text style={styles.price}>
                            {Number(product.sanpham_gia).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND"
                            })}
                        </Text>
                        <View style={styles.fRow}>
                            <TouchableOpacity style={styles.btn} onPress={handleDecrease}>
                                <Text style={styles.text}>-</Text>
                            </TouchableOpacity>
                            <View style={styles.pdH20}>
                                <Text style={styles.quantity}>{quantity}</Text>
                            </View>
                            <TouchableOpacity style={styles.btn} onPress={hadleIncrese}>
                                <Text style={styles.text}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity style={[styles.btnAction, styles.buy]}>
                                <Text style={styles.textAction}>Mua ngay</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btnAction, styles.addCart]}>
                                <Text style={styles.textAction}>Thêm vào giỏ</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.infoP}>
                            <Text>Mã: <Text style={styles.blackColor}>{product.id}</Text></Text>
                            <Text>Danh mục: <Text style={styles.blackColor}>{cate}</Text></Text>
                        </View>
                        <View style={styles.desc}>
                            <Text style={styles.titleDesc}>Mô tả chi tiết</Text>
                            <Text style={styles.pDesc}>{product.sanpham_mo_ta}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bgWhite: {
        backgroundColor: "#fff"
    },
    mt80: {
        marginTop: 80
    },
    img: {
        width: "100%",
        height: 400,
        resizeMode: 'cover'
    },
    pd15: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15
    },
    pdH20: {
        paddingHorizontal: 30
    },
    thumbnail: {
        marginTop: 5,
        fontSize: 15
    },
    nameP: {
        fontWeight: 500
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 15,
        fontWeight: 500,
        lineHeight: 25
    },
    price: {
        fontSize: 16,
        color: "#F14D2D",
        fontWeight: 500,
        marginBottom: 15
    },
    fRow: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderWidth: 1,
        justifyContent: "center",
    },
    quantity: {
        fontSize: 20
    },
    btn: {
        fontSize: 20,
        paddingHorizontal: 40,
        paddingVertical: 10
    },
    text: {
        fontSize: 25,
        fontWeight: 500,
    },
    actions: {
        display: "flex",
        gap: 10,
        paddingVertical: 20,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomColor: "#ccc",
        borderWidth: 1,
        borderStyle: "solid"
    },
    btnAction: {
        paddingVertical: 15,
        display: "flex",
        alignItems: 'center',
        justifyContent: "center"
    },
    textAction: {
        fontSize: 15,
        color: "#fff",
        fontWeight: 400
    },
    buy: {
        backgroundColor: "#FB6E2E"
    },
    addCart: {
        backgroundColor: "#5597F0"
    },
    infoP: {
        flexDirection: "row",
        gap: 10,
        paddingVertical: 15,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomColor: "#ccc",
        borderWidth: 1,
        borderStyle: "solid"
    },
    blackColor: {
        color: "black",
        fontWeight: 500
    },
    desc: {
        paddingVertical: 15
    },
    titleDesc: {
        textAlign: "center",
        fontSize: 17,
        fontWeight: 500,
        textTransform: "uppercase",
        marginBottom: 10
    },
    pDesc: {
        fontSize: 16
    }
});
