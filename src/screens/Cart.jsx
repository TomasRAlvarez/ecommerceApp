import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCart from "../components/ProductCart";
import { colors } from "../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { removeFromCart } from "../features/Cart/cartSlice";

const Cart = ({ navigation }) => {
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "Carrito",
		});
	}, [navigation]);

	const { items: CartItems, total } = useSelector((state) => state.cartReducer.value);

	const dispatch = useDispatch();
	const handleRemove = (id) => {
		dispatch(removeFromCart({ id }));
	};

	if (total) {
		return (
			<View style={styles.container}>
				<FlatList
					data={CartItems}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => {
						return <ProductCart item={item} handleRemove={handleRemove} />;
					}}
				/>
				<View style={styles.totalContainer}>
					<Text style={styles.totalText}>Precio Total: ${total}</Text>
					<TouchableOpacity style={styles.checkoutButton}>
						<Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	} else {
		return (
			<View style={styles.emptyContainer}>
				<MaterialCommunityIcons name='cart-remove' size={50} color='black' />
				<Text style={styles.emptyText}>No hay productos en el carrito</Text>
			</View>
		);
	}
};

export default Cart;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: "#f5f5f5",
	},
	totalContainer: {
		paddingVertical: 20,
		borderTopWidth: 1,
		borderColor: "#ccc",
		alignItems: "center",
	},
	totalText: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	checkoutButton: {
		backgroundColor: colors.primary,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	checkoutButtonText: {
		color: colors.text,
		fontSize: 16,
		fontWeight: "bold",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyText: {
		fontSize: 20,
		color: "grey",
	},
});
