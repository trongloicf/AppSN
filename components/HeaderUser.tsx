import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HeaderUser() {
    return (
        <View style={styles.container}>
            <View style={[styles.row, styles.justifySpaceBetween, styles.pd5, styles.bgHeader, styles.alignCenter]}>
                <TouchableOpacity>
                    <Text style={[styles.colorWhite, styles.fS16]}>Welcome, duongcao</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome6 style={[styles.colorWhite]} name="bag-shopping" size={24}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    justifySpaceBetween: {
        justifyContent: "space-between"
    },
    row: {
        flexDirection: "row"
    },
    pd5: {
        padding: 5
    },
    pd10: {
        padding: 10
    },
    container: {
        position: "relative",
        backgroundColor: "#fafafa",
    },
    colorWhite: {
        color: "#fff",
    },
    fS16: {
        fontSize: 16
    },
    bgHeader: {
        backgroundColor: "#f7694cff"
    },
    alignCenter: {
        alignItems: "center"
    }
})