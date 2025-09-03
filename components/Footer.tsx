import Icon from '@expo/vector-icons/FontAwesome6'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function Footer() {
    return (
        <>
            <View style={styles.footer}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <View style={styles.col2}>
                            <View style={styles.flexRow}>
                                <Icon name="phone" size={24} color="#fff"/>
                                <View>
                                    <Text style={styles.textColor}>Mua hàng:</Text>
                                    <Text style={styles.textColor}>0337337848</Text>    
                                </View>
                            </View>
                        </View>
                        <View style={styles.col2}>
                            <View style={styles.flexRow}>
                                <Icon name="mail-bulk" size={24} color="#fff"></Icon>
                                <View>
                                    <Text style={styles.textColor}>Email:</Text>
                                    <Text style={styles.textColor}>dotrongloi9@gmail.com</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.borderTop}>
                        <Text style={styles.fTitle}>SNEAKER DAILY lắng nghe bạn!</Text>
                        <Text style={styles.fContentTitle}>Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt hơn nữa.</Text>
                        <TouchableOpacity style={styles.btnFooter}>
                            <Text style={styles.textBtnF}>Gửi ý kiến</Text>
                        </TouchableOpacity>
                        <View style={styles.social}>
                            <Icon name="facebook" color="#fff" size={35} />
                            <Icon name="square-instagram" size={35} color="#fff" />
                            <Icon name="tiktok" size={35} color="#fff" />
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: "#000000",
        padding: 10,
    },
    textColor: {
        color: "#fff"
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    container: {
        flex: 1,
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
    },
    borderTop: {
        borderWidth: 1,
        borderTopColor: "#fff"
    }
    ,
    fTitle: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10
    },
    fContentTitle: {
        color: "#fff"
    },
    btnFooter: {
        marginTop: 15,
        padding: 15,
        backgroundColor: "#5597F0",
        width: 150,
        borderRadius: 15,
        marginBottom: 15
    },
    textBtnF: {
        color: "#fff",
        textAlign: "center"
    },
    social: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 15
    }
})

export default Footer