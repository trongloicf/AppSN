import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = "cart";

export const getCart = async () => {
    try {
        const value = await AsyncStorage.getItem(CART_KEY);
        return value ? JSON.parse(value) : [];
    } catch (e) {
        console.log("Lỗi khi đọc giỏ hàng:", e);
        return [];
    }
};

export const saveCart = async (cart: any[]) => {
    try {
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
        console.log("Lỗi khi lưu giỏ hàng:", e);
    }
};

export const clearCart = async () => {
    try {
        await AsyncStorage.removeItem(CART_KEY);
    } catch (e) {
        console.log("Lỗi khi xóa giỏ hàng:", e);
    }
};

export const addToCart = async (product: any) => {
  const cart = await getCart();

  // So sánh cả id + color_id + size_id
  const index = cart.findIndex(
    (item: any) =>
      item.id === product.id &&
      item.color_id === product.color_id &&
      item.size_id === product.size_id
  );

  if (index !== -1) {
    // Nếu cùng id + màu + size thì tăng số lượng
    cart[index].quantity += product.quantity;
  } else {
    // Nếu khác màu hoặc size thì thêm mới
    cart.push(product);
  }

  await saveCart(cart);
  return cart;
};
