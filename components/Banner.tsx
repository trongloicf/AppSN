import { memo } from "react";
import { Image, StyleSheet, View } from "react-native";

function Banner() {
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={{ uri: "https://vebongdaonline.vn/wp-content/uploads/2023/07/doi-hinh-MU-2008-12.png"}} />
        </View>
    )
}

export default memo(Banner)

const styles = StyleSheet.create({
    container: {
        width: "100%",
    }, 
    img: {
        objectFit: "cover",
        width: "100%",
        height: 150
    }
})