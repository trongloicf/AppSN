import { memo } from "react";
import { Image, StyleSheet, View } from "react-native";

function Banner() {
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={{ uri: "https://sneakerdaily.vn/wp-content/uploads/2024/01/1360_520.png.webp"}} />
        </View>
    )
}

export default memo(Banner)

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 80
    }, 
    img: {
        objectFit: "contain",
        width: "100%",
        height: 200
    }
})