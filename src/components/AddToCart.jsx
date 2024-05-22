import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { colors } from "../constants/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "../features/counter/counterSlice";
import { addToCart } from "../features/Cart/cartSlice";

const AddToCart = ({ navigation, product }) => {
	const count = useSelector((state) => state.counterReducer.value);
	const user = useSelector((state) => state.userReducer.value.user);
	const dispatch = useDispatch();

	const handleCart = () => {
		if (user) {
			dispatch(addToCart({ ...product, quantity: count }));
			dispatch(reset());
			Alert.alert("¡Listo!", "Tu producto ya se agrego al carrito");
		} else {
			Alert.alert("Cuidado", "Debe iniciar sesion para hacer una compra", [
				{
					text: "Ok",
					onPress: () => {
						navigation.navigate("ProfileNavigator");
					},
				},
			]);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.quantityContainer}>
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity style={styles.button} onPress={() => dispatch(decrement())}>
						<FontAwesome6 name='minus' size={20} color='black' />
					</TouchableOpacity>
					<Text style={styles.quantity}>{count}</Text>
					<TouchableOpacity style={styles.button} onPress={() => dispatch(increment())}>
						<FontAwesome6 name='add' size={20} color='black' />
					</TouchableOpacity>
				</View>
				<Text style={styles.total}>Total: ${(product.price * count).toFixed(2)}</Text>
			</View>
			<TouchableOpacity style={styles.addToCartButton} onPress={handleCart}>
				<Text style={styles.addToCartButtonText}>Añadir al carrito</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AddToCart;

const styles = StyleSheet.create({
	container: {
		width: "90%",
		height: 130,
		padding: 10,
		backgroundColor: "white",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		marginTop: 15,
		alignItems: "center",
		justifyContent: "space-evenly",
	},

	quantityContainer: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "space-evenly",
		marginBottom: 10,
	},

	button: {
		alignSelf: "center",
	},

	quantity: {
		marginHorizontal: 15,
		fontSize: 25,
	},

	total: {
		marginLeft: 10,
		fontSize: 18,
	},

	addToCartButton: {
		width: "80%",
		backgroundColor: colors.primary,
		paddingVertical: 10,
		borderRadius: 5,
	},

	addToCartButtonText: {
		color: "white",
		textAlign: "center",
		fontSize: 18,
	},
});
