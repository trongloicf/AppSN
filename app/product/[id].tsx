import { API } from "@/constants/Api";
import { addToCart } from "@/storages/cartStorage";
import { FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from 'react';
import { Image, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetail() {
    interface Size {
        id: number;
        size_ten: string;
        created_at: string;
        updated_at: string;
    }

    interface SizeColor {
        id: number;
        size_id: number;
        size_ten: string;
        color_id: number;
        color_ten: string;
        color_ma: string;
        so_luong: number;
    }

    interface ImageColor {
        id: number;
        color_id: number;
        color_ten: string;
        color_ma: string;
        image_url: string;
    }

    const { id } = useLocalSearchParams<{ id: string }>();
    const [sizes, setSizes] = useState<Size[]>([]);
    const [product, setProduct] = useState<{
        id: number;
        sanpham_ten: string;
        sanpham_anh: string;
        sanpham_mo_ta: string;
        sanpham_gia: string;
        loaisanpham_ten: string;
        thuonghieu_ten: string;
        xuatxu_ten: string;
        chatlieu_ten: string;
        imagesColor: ImageColor[];
        sizesColors: SizeColor[];
        gia_goc: number;
        gia_giam: number;
    } | null>(null);
    const [quantity, setQuantity] = useState(1)
    const [showDesc, setShowDesc] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [selectedColor, setSelectedColor] = useState<number | null>(null)
    const [selectedSize, setSelectedSize] = useState<number | null>(null)
    const [currentImage, setCurrentImage] = useState<string | null>(null)


    const toggleDesc = () => {
        LayoutAnimation.easeInEaseOut();
        setShowDesc(!showDesc);
    };

    const toggleDetail = () => {
        LayoutAnimation.easeInEaseOut();
        setShowDetail(!showDetail);
    };

    useFocusEffect(
        useCallback(() => {
            setQuantity(1)
            setSelectedSize(null)
            setCurrentImage(null)
            setSelectedColor(null)
        }, [])
    );

    useEffect(() => {
        fetch(`${API}/products/${id}`)
            .then((response) => response.json())
            .then(data => {
                const productData = Array.isArray(data) ? data[0] : data
                // console.log(productData)
                setProduct(productData)
            })
            .catch((err) => console.log(err))
    }, [id])

    useEffect(() => {
        fetch(`${API}/sizes`)
            .then((res) => res.json())
            .then((data) => setSizes(data))
            .catch((er) => console.log(er))
    }, [])

    const hadleIncrese = () => {
        const quantitySizeColors = product?.sizesColors.find((quantitySizeColor) =>
            (quantitySizeColor.color_id === selectedColor && quantitySizeColor.size_id === selectedSize)
        )
        if (quantitySizeColors && quantity < quantitySizeColors.so_luong) {
            setQuantity((prev) => prev + 1)
        }
        // if (selectedSize && quantity < selectedSize.so_luong) {
        //     setQuantity((prev) => prev + 1)
        // }
    }

    const handleDecrease = () => {
        setQuantity((prev) => prev > 1 ? prev - 1 : 1)
    }

    const handleAddToCart = async () => {
        if (!selectedColor || !selectedSize) {
            alert("Vui lòng chọn màu sắc và size!");
            return;
        }

        const colorObj = product?.imagesColor.find(c => c.color_id === selectedColor);
        const sizeObj = product?.sizesColors.find(s => s.size_id === selectedSize && s.color_id === selectedColor);

        const productItemCart = {
            id: product?.id,
            name: product?.sanpham_ten,
            image: currentImage || product?.sanpham_anh,
            priceOrigin: product?.gia_goc,
            price: product?.gia_giam ? product.gia_giam : product?.gia_goc,
            quantity: quantity,
            color_id: selectedColor,
            color_ten: colorObj?.color_ten,
            size_id: selectedSize,
            size_ten: sizeObj?.size_ten,
        };

        await addToCart(productItemCart);
        alert("Đã thêm vào giỏ!");
    };

    if (!product) return null;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#333" }}>
            <View style={[styles.bgWhite, styles.bBottomGray, styles.pdV5, styles.headerDetail, styles.alignCenter]}>
                <View style={[styles.fRow, styles.gap10, styles.alignCenter]}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <FontAwesome6 name="arrow-left-long" style={styles.backIcon} size={23} />
                    </TouchableOpacity>
                    <Text style={styles.nameApp}>SNEAKER DAILY</Text>
                </View>
                <View style={[styles.mr10, styles.fRow, styles.gap10]}>
                    <TouchableOpacity>
                        <FontAwesome6 name="bag-shopping" size={23} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.bgWhite}>
                <View style={styles.bgWhite}>
                    <Image
                        source={{ uri: currentImage || product.sanpham_anh }}
                        style={styles.img}
                        resizeMode="cover"
                    />
                    <View style={styles.pd15}>
                        <Text style={styles.title}>{product.sanpham_ten}</Text>
                        {product.gia_giam ? (
                            <View style={[styles.fRow, styles.alignCenter, styles.mb15, styles.gap10]}>
                                <Text style={styles.price}>
                                    {Number(product.gia_giam).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND"
                                    })}
                                </Text>
                                <Text style={[styles.lineThrough, styles.priceOld]}>
                                    {Number(product.gia_goc).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND"
                                    })}
                                </Text>
                            </View>
                        ) : (
                            <Text style={[styles.price, styles.mb15]}>
                                {Number(product.sanpham_gia).toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND"
                                })}
                            </Text>
                        )}
                        <View style={[styles.fRow, styles.mb15, styles.alignCenter]}>
                            <Text style={[styles.mr10, styles.fS17]}>Màu sắc</Text>
                            <View style={[styles.fRow, styles.gap10]}>
                                {product.imagesColor.map((imageColor) => {
                                    return (
                                        <TouchableOpacity
                                            key={imageColor.id}
                                            onPress={() => {
                                                setSelectedColor(imageColor.color_id);
                                                setSelectedSize(null);
                                                setCurrentImage(imageColor.image_url);
                                            }}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: 50,
                                                backgroundColor: imageColor.color_ma,
                                                borderWidth: selectedColor === imageColor.color_id ? 2 : 1,
                                                borderColor: selectedColor === imageColor.color_id ? "#F14D2D" : "#ccc"
                                            }}
                                        />
                                    )
                                })}
                            </View>
                        </View>
                        <View style={[styles.fRow, styles.mb15, styles.alignCenter]}>
                            <Text style={[styles.mr10, styles.fS17]}>Size</Text>
                            <View style={[styles.fRow, styles.gap10]}>
                                {sizes.map((size) => {
                                    // tìm sizeColor khớp với size + màu đã chọn
                                    const sc = product.sizesColors.find(
                                        (s) => s.size_id === size.id && s.color_id === selectedColor
                                    );

                                    const disabled = !sc || sc.so_luong === 0;
                                    const isSelected = selectedSize === size.id;

                                    return (
                                        <TouchableOpacity
                                            key={size.id}
                                            disabled={disabled}
                                            onPress={() => setSelectedSize(size.id)}
                                            style={[
                                                styles.pdH10,
                                                styles.pdV5,
                                                styles.bdBlack,
                                                styles.bR10,
                                                isSelected && { backgroundColor: "#333", borderColor: "#333" },
                                                disabled && { opacity: 0.4 }
                                            ]}
                                        >
                                            <Text style={{ color: isSelected ? "#fff" : "#333" }}>
                                                {size.size_ten}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                        <View style={[styles.fRow, styles.gap10, styles.alignCenter]}>
                            <View style={[styles.fRow, styles.inputQuantity]}>
                                <TouchableOpacity style={[styles.btn]} onPress={handleDecrease}>
                                    <Text style={styles.text}>-</Text>
                                </TouchableOpacity>
                                <View style={[styles.pdH8]}>
                                    <Text style={styles.quantity}>{quantity}</Text>
                                </View>
                                <TouchableOpacity style={[styles.btn]} onPress={hadleIncrese}>
                                    <Text style={styles.text}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={[styles.btnAction, styles.addCart, styles.bdR30]} onPress={handleAddToCart}>
                                {/* <Text style={styles.textAction}>Thêm vào giỏ</Text> */}
                                <FontAwesome6 name="cart-plus" style={styles.textAction} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity style={[styles.btnAction, styles.buy, styles.bdR30]}>
                                <Text style={styles.textAction}>Mua ngay</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.desc, styles.bdTopGray]}>
                            <TouchableOpacity onPress={toggleDesc}>
                                <Text style={styles.titleDesc}>Mô tả sản phẩm</Text>
                            </TouchableOpacity>
                            {showDesc &&
                                <Text style={styles.pDesc}>{product.sanpham_mo_ta}</Text>
                            }
                        </View>
                        <View style={[styles.desc, styles.bdTopGray]}>
                            <TouchableOpacity onPress={toggleDetail}>
                                <Text style={styles.titleDesc}>Chi tiết sản phẩm</Text>
                            </TouchableOpacity>
                            {showDetail &&
                                <View>
                                    <View style={[styles.fRow, styles.detail]}>
                                        <Text style={[styles.label]}>Danh mục</Text>
                                        <Text style={[styles.value]}>{product.loaisanpham_ten}</Text>
                                    </View>
                                    <View style={[styles.fRow, styles.detail]}>
                                        <Text style={[styles.label]}>Xuất xứ</Text>
                                        <Text style={[styles.value]}>{product.xuatxu_ten}</Text>
                                    </View>
                                    <View style={[styles.fRow, styles.detail]}>
                                        <Text style={[styles.label]}>Chất liệu</Text>
                                        <Text style={[styles.value]}>{product.chatlieu_ten}</Text>
                                    </View>
                                    <View style={[styles.fRow, styles.detail]}>
                                        <Text style={[styles.label]}>Thương hiệu</Text>
                                        <Text style={[styles.value]}>{product.thuonghieu_ten}</Text>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerDetail: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    mb15: {
        marginBottom: 15
    },
    nameApp: {
        fontSize: 16,
        fontWeight: 500
    },
    textCenter: {
        textAlign: "center"
    },
    backIcon: {
        color: "#333",
        marginLeft: 10
    },
    bR10: {
        borderRadius: 10
    },
    bookmarkIcon: {
        color: "#333",
    },
    bdBlack: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#333"
    },
    bBottomGray: {
        borderColor: "#ccc",
        borderBottomWidth: 1,
        borderStyle: "solid"
    },
    pdV5: {
        paddingVertical: 5
    },
    bgWhite: {
        backgroundColor: "#fafafa"
    },
    mr10: {
        marginRight: 10
    },
    img: {
        width: "100%",
        height: 350,
    },
    pd15: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15
    },
    pdH8: {
        paddingHorizontal: 8
    },
    pdH10: {
        paddingHorizontal: 15
    },
    thumbnail: {
        marginTop: 5,
        fontSize: 15
    },
    gap10: {
        gap: 10
    },
    nameP: {
        fontWeight: 500
    },
    title: {
        fontSize: 17,
        marginBottom: 10,
        marginTop: 15,
        fontWeight: 500,
        lineHeight: 25
    },
    price: {
        fontSize: 18,
        color: "#F14D2D",
        fontWeight: 500,
    },
    priceOld: {
        fontSize: 15,
        color: "#848383ff",
        fontWeight: 500,
    },
    fRow: {
        flexDirection: "row"
    },
    inputQuantity: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fafafa",
        borderRadius: 30,
        flex: 1
        // overflow: "hidden",
        // borderWidth: 1,
        // borderColor: "#ccc",
    },
    quantity: {
        fontSize: 20,
        textAlign: "center",
        minWidth: 40,
    },
    btn: {
        fontSize: 20,
        width: 35,
        height: 35,
        backgroundColor: '#e4e3e3ff',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    text: {
        fontSize: 20,
        fontWeight: 500,
    },
    actions: {
        display: "flex",
        gap: 10,
        paddingVertical: 20,
    },
    btnAction: {
        height: 45,
        display: "flex",
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    textAction: {
        fontSize: 16,
        color: "#fff",
        fontWeight: 500
    },
    buy: {
        backgroundColor: "#FB6E2E"
    },
    addCart: {
        backgroundColor: "#26AA99"
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
        fontSize: 15,
        color: "#444"
    },
    alignCenter: {
        alignItems: "center"
    },
    fS17: {
        fontSize: 17
    },
    bdR30: {
        borderRadius: 30
    },
    lineThrough: {
        textDecorationLine: "line-through"
    },
    bdTopGray: {
        borderTopWidth: 1,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        borderTopColor: "#ccc",
        borderStyle: "solid"
    },
    detail: {
        justifyContent: "space-between",
        paddingVertical: 12
    },
    label: {
        color: "#333",
        fontWeight: "bold"
    },
    value: {
        color: "#555"
    },
});
