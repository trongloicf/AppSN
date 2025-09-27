import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdateInfoUser() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#333" }}>
            <ScrollView style={{ flex: 1, backgroundColor: "#fafafa" }}>
                <View style={[styles.row, styles.alignCenter, styles.justifySpaceBetween, styles.pdH10, styles.pdV10, styles.bdBottomGray]}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <FontAwesome6 name="arrow-left-long" size={18} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18 }}>Sửa hồ sơ</Text>
                    <TouchableOpacity disabled>
                        <Text style={[styles.fS16, styles.colorSave]}>Lưu</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={[styles.row, styles.info, styles.pdH10]}>
                        <Text style={[styles.fS16]}>Tên</Text>
                        <View style={[styles.row, styles.gap5, styles.alignCenter]}>
                            <Text style={[styles.fS16]}>
                                Cao Xuân Dương
                            </Text>
                            <FontAwesome6 style={{ color: "#ccc" }} name="chevron-right" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row, styles.info, styles.pdH10]}>
                        <Text style={[styles.fS16]}>Email</Text>
                        <View style={[styles.row, styles.gap5, styles.alignCenter]}>
                            <Text style={[styles.fS16]}>
                                duong2811@gmail.com
                            </Text>
                            <FontAwesome6 style={{ color: "#ccc" }} name="chevron-right" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row, styles.info, styles.pdH10]}>
                        <Text style={[styles.fS16]}>Điện thoại</Text>
                        <View style={[styles.row, styles.gap5, styles.alignCenter]}>
                            <Text style={[styles.fS16]}>
                                0337337848
                            </Text>
                            <FontAwesome6 style={{ color: "#ccc" }} name="chevron-right" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.row, styles.info, styles.pdH10]}>
                        <Text style={[styles.fS16]}>Địa chỉ</Text>
                        <View style={[styles.row, styles.gap5, styles.alignCenter]}>
                            <Text style={[styles.fS16, styles.flexWrap]}>
                                Xóm 2, Thôn Bắc Châu, Xã Khoái Châu, Tỉnh Hưng Yên
                            </Text>
                            <FontAwesome6 style={{ color: "#ccc" }} name="chevron-right" />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pdH10: {
        paddingHorizontal: 10
    },
    pdV10: {
        paddingVertical: 10
    },
    justifySpaceBetween: {
        justifyContent: "space-between"
    },
    row: {
        flexDirection: "row"
    },
    alignCenter: {
        alignItems: "center"
    },
    fS16: {
        fontSize: 16
    },
    gap5: {
        gap: 5
    },
    bdBottomGray: {
        borderBottomWidth: 1,
        borderColor: "#ccc"
    },
    info: {
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#ccc"
    },
    label: {
        color: "#333",
        fontWeight: "bold"
    },
    value: {
        color: "#555"
    },
    colorSave: {
        color: "#F14D2D"
    },
    flexWrap: {
        width: 200,
        flexWrap: "wrap"
    }
})