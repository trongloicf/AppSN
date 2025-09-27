import HeaderUser from "@/components/HeaderUser";
import { FontAwesome6 } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function User() {
    return (
        <SafeAreaView style={{backgroundColor: "#333", flex: 1}}>
            <HeaderUser />
            <ScrollView style={{backgroundColor: "#fafafa"}}>
                <View style={[styles.pdH10, styles.bgWhite, styles.pdV10]}>
                    <TouchableOpacity style={[styles.row, styles.justifySpaceBetween, styles.alignCenter,]}>
                        <Text style={[styles.fS16]}>Đơn mua</Text>
                        <View style={[styles.row, styles.gap5, styles.alignCenter]}>
                            <Text style={[styles.fS16]}>
                                Xem lịch sử mua hàng
                            </Text>
                            <FontAwesome6 style={{ color: "#ccc" }} name="chevron-right" />
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.row, styles.gap5, styles.alignCenter, styles.justifySpaceBetween, styles.pdV10]}>
                        <TouchableOpacity>
                            <View style={[styles.alignCenter, styles.pdV10]}>
                                <FontAwesome6 name="hourglass-half" size={18}/>
                            </View>
                            <Text>Chờ xác nhận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.alignCenter, styles.pdV10]}>
                                <FontAwesome6 name="truck-fast" size={18}/>
                            </View>
                            <Text>Đang giao hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.alignCenter, styles.pdV10]}>
                                <FontAwesome6 name="box-open" size={18}/>
                            </View>
                            <Text>Đã giao</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pdV10: {
        paddingVertical: 10
    },
    pdH10: {
        paddingHorizontal: 10
    },
    bgWhite: {
        backgroundColor: "#fafafa"
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
        fontSize: 15
    },
    gap5: {
        gap: 5
    }
})